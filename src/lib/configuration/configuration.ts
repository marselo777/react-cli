export class UserConfiguration {
    static create() {
        return {
            userDir: process.cwd(),
        };
    }
}
