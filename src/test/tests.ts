// Unit testing for Automata
import {expect, assert} from "chai";
import {Coordinator} from "..";

// Test globals
const globalAny: any = global;
const describe: any = globalAny.describe;
const it: any = globalAny.it;

const coordinator: Coordinator = new Coordinator();

describe("Coordinator", () => {
    it("should have no initial operations", () => {
        expect((coordinator as any).operations).to.be.an("array").and.to.have.length(0);
    });

    it("should not be running", () => {
        expect(coordinator.running).to.be.a("boolean").and.to.equal(false);
    });

    describe("then()", () => {
        it("should queue operations", () => {
            coordinator.then(() => console.log("test"));
    
            expect((coordinator as any).operations).to.be.an("array").and.to.have.length(1);
        });

        it("should throw on invalid parameters", () => {
            assert.throws(() => coordinator.then(undefined as any));
            assert.throws(() => coordinator.then(null as any));
            assert.throws(() => coordinator.then(1 as any));
            assert.throws(() => coordinator.then(0 as any));
            assert.throws(() => coordinator.then(true as any));
            assert.throws(() => coordinator.then(false as any));
            assert.throws(() => coordinator.then([] as any));
            assert.throws(() => coordinator.then({} as any));
        });
    });
});