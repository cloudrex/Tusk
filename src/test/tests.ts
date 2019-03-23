import {expect, assert} from "chai";
import {Operation} from "../core/helpers";
import {Coordinator} from "../core/coordinator";

// Test globals.
const globalAny: any = global;
const describe: any = globalAny.describe;
const it: any = globalAny.it;

const action: Operation = () => {};
const coordinator: Coordinator = new Coordinator();

describe("Coordinator", () => {
    it("should have no initial operations", () => {
        expect((coordinator as any).operations).to.be.an("array").and.to.have.length(0);


    it("should have no initial webhooks", () => {
        expect((coordinator as any).webhooks).to.be.an("array").and.to.have.length(0);
    });

    it("should not be running", () => {
        expect(coordinator.running).to.be.a("boolean").and.to.equal(false);
    });

    describe("then()", () => {
        it("should queue operations", () => {
            coordinator.queue(() => console.log("test"));

            expect((coordinator as any).operations).to.be.an("array").and.to.have.length(1);
        });

        it("should throw on invalid parameters", () => {
            // Operation parameter.
            assert.throws(() => coordinator.queue(undefined as any));
            assert.throws(() => coordinator.queue(null as any));
            assert.throws(() => coordinator.queue(1 as any));
            assert.throws(() => coordinator.queue(0 as any));
            assert.throws(() => coordinator.queue(true as any));
            assert.throws(() => coordinator.queue(false as any));
            assert.throws(() => coordinator.queue([] as any));
            assert.throws(() => coordinator.queue({} as any));

            // Regardless parameter.
            assert.throws(() => coordinator.queue(action, null as any));
            assert.throws(() => coordinator.queue(action, 1 as any));
            assert.throws(() => coordinator.queue(action, 0 as any));
            assert.throws(() => coordinator.queue(action, [] as any));
            assert.throws(() => coordinator.queue(action, {} as any));
            assert.throws(() => coordinator.queue(action, action as any));
        });
    });

    describe("timeout()", () => {
        it("should set timeout", () => {
            coordinator.timeout(1_500);

            expect((coordinator as any).timeoutTime).to.be.a("number").and.to.equal(1_500);
        });

        it("should throw on invalid parameters", () => {
            assert.throws(() => coordinator.timeout(undefined as any));
            assert.throws(() => coordinator.timeout(null as any));
            assert.throws(() => coordinator.timeout(true as any));
            assert.throws(() => coordinator.timeout(0));
            assert.throws(() => coordinator.timeout(-1));
            assert.throws(() => coordinator.timeout(-100));
            assert.throws(() => coordinator.timeout(false as any));
            assert.throws(() => coordinator.timeout([] as any));
            assert.throws(() => coordinator.timeout({} as any));
        });
    });
});
