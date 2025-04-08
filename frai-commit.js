#!/usr/bin/env node
import 'dotenv/config';
import simpleGit from 'simple-git';
import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';

class AICommitMessageGenerator {
    constructor(apiKey, modelName = 'gemini-2.0-flash') {
        if (!apiKey) {
            throw new Error('Missing GEMINI_API_KEY in environment.');
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.modelName = modelName;
    }

    async generate(diff) {
        const model = this.genAI.getGenerativeModel({ model: this.modelName });

        const prompt = `
You are a helpful assistant that writes concise and meaningful Git commit messages in English based on code changes (git diff).
Please write a commit message for the following code changes, use Class names and method names in the commit message,
and use the imperative mood.:

\`\`\`diff
${diff}
\`\`\`

Commit message:
    `.trim();

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const message = response.text().trim();

        return message.split('\n')[0];
    }
}

class GitHelper {
    constructor() {
        this.git = simpleGit();
    }

    async hasChangesToCommit() {
        const status = await this.git.status();
        return status.modified.length > 0;
    }

    async getStagedDiff() {
        const diff = await this.git.diff(); // Default: staged changes
        return diff || 'No changes detected.';
    }

    async commit(message) {
        await this.git.commit(message, ['-a']);
    }
}

async function run() {
    const generator = new AICommitMessageGenerator(process.env.GEMINI_API_KEY);
    const gitHelper = new GitHelper();

    try {
        console.log(chalk.blue('🔄 Checking for modified files...'));
        const hasChanges = await gitHelper.hasChangesToCommit();

        if (!hasChanges) {
            console.log(chalk.yellow('🚫 No files to commit. Exiting...'));
            return;
        }

        console.log(chalk.blue('🔍 Reading staged changes...'));
        const diff = await gitHelper.getStagedDiff();

        console.log(chalk.blue('🤖 Generating commit message...'));
        const message = await generator.generate(diff);

        console.log(chalk.green('\n✅ Generated commit message:\n'));
        console.log(chalk.cyan(message), '\n');

        await gitHelper.commit(message);

        console.log(chalk.green('🚀 Commit completed successfully!'));
    } catch (error) {
        console.error(chalk.red('❌ Error:'), error.message);
    }
}

run();
