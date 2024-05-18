import { describe, it, expect, beforeEach } from "vitest";
import { Model, Field, defaults, LifecycleFunction } from "../../src/exports";

// Accept Lifecycle Function
const flag1 = { called: false };
const flag2 = { called: false };
const flag3 = { called: false };

const admin = LifecycleFunction.new({
    key: "admin",
    execute: async function (payload) {
        flag1.called = true;
        return payload.options.token === "admin";
    },
});

const acceptModifyFunction = LifecycleFunction.new({
    key: "accept_modify",
    execute: async function (payload) {
        flag2.called = true;
        payload.query.limit = 10;
        return true;
    },
});

const rule_true = LifecycleFunction.new({
    key: "rule_true",
    execute: async function (payload) {
        flag3.called = true;
        return true;
    },
});

@Model.Decorator({
    database: defaults.database.store,
    binds: {
        read: {
            role: [admin, defaults.lifecycle.everybody],
            accept: {
                admin: {
                    modify: [acceptModifyFunction],
                    rule: [rule_true],
                },
            },
        },
        create: {
            role: [],
        },
    },
})
class TrueQueryTextModel extends Model {
    @Field.Decorator({ type: defaults.type.text })
    textField!: string;
}

describe("QueryTextModel Accept and Rule Lifecycle Tests", async () => {
    await TrueQueryTextModel.create({ textField: "abc" });
    await TrueQueryTextModel.create({ textField: "def" });
    await TrueQueryTextModel.create({ textField: "ghi" });

    it("should call accept modify function and rule_true when admin role is accepted", async () => {
        flag1.called = false;
        flag2.called = false;
        flag3.called = false;
        const results = await TrueQueryTextModel.read({}, { token: "admin" });
        expect(flag1.called).toBe(true);
        expect(flag2.called).toBe(true);
        expect(flag3.called).toBe(true);
        expect(results).toHaveLength(3);
    });

    it("should not call accept modify function when role is not accepted", async () => {
        flag1.called = false;
        flag2.called = false;
        flag3.called = false;

        const results = await TrueQueryTextModel.read({}, { token: "user" });

        expect(flag1.called).toBe(true);
        expect(flag2.called).toBe(false);
        expect(flag3.called).toBe(false);
        expect(results).toHaveLength(3);
    });
});
