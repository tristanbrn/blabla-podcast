import { truncate } from "../text";

describe('Text helpers', () => {
    describe('truncate', () => {
        it('shuld truncate if text is longer than 7', () => {
            const expected = 'hello wo...';

            expect(truncate('hello world', 7).toBe(expected))
        })
    })
})