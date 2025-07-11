import {describe, it , expect} from 'vitest' ;
import {SaveTimerLog , parseCommand} from '../source/utils/utils' ; 



describe("parse the input command in the cli" , () => {
    it('takes a string fromat like 1h30m to number of seconds' , () => {
        const ParsedValue: number = 1 * 60 * 60 + 30 * 60; 
        expect(parseCommand("1h30m")).toBe(ParsedValue) ; 
    }); 
}); 


