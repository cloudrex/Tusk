export default class SpaceMachine {
    public static make(length: number, char: string = " "): string {
        let result: string = "";

        for (let i: number = 0; i < length; i++) {
            result += char;
        }

        return result;
    }
}
