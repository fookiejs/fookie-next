import { describe, it, expect } from "vitest";
import { Model, Field, defaults } from "../../src/exports";
import { FookieError } from "../../src/core/error";

describe("QueryDateModel Query Tests", async () => {
    @Model.Decorator({
        database: defaults.database.store,
        binds: {
            read: {
                role: [],
            },
            create: {
                role: [],
            },
        },
    })
    class QueryDateModel extends Model {
        @Field.Decorator({ type: defaults.type.date })
        dateField!: string;
    }

    await QueryDateModel.create({ dateField: "2024-05-14" });
    await QueryDateModel.create({ dateField: "2024-05-15" });
    await QueryDateModel.create({ dateField: "2024-05-16" });

    it("equals query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { equals: "2024-05-14" },
            },
        });
        expect(results).toHaveLength(1);
        expect(results[0].dateField).toBe("2024-05-14");
    });

    it("notEquals query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { notEquals: "2024-05-14" },
            },
        });
        expect(results).toHaveLength(2);
        expect(results[0].dateField).not.toBe("2024-05-14");
    });

    it("in query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { in: ["2024-05-14", "2024-05-15"] },
            },
        });
        expect(results).toHaveLength(2);
        expect(results.map((r) => r.dateField)).toEqual(
            expect.arrayContaining(["2024-05-14", "2024-05-15"]),
        );
    });

    it("notIn query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { notIn: ["2024-05-14", "2024-05-15"] },
            },
        });
        expect(results).toHaveLength(1);
        expect(results[0].dateField).toBe("2024-05-16");
    });

    it("gte query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { gte: "2024-05-15" },
            },
        });
        expect(results).toHaveLength(2);
        expect(results.map((r) => r.dateField)).toEqual(
            expect.arrayContaining(["2024-05-15", "2024-05-16"]),
        );
    });

    it("gt query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { gt: "2024-05-15" },
            },
        });
        expect(results).toHaveLength(1);
        expect(results[0].dateField).toBe("2024-05-16");
    });

    it("lte query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { lte: "2024-05-15" },
            },
        });
        expect(results).toHaveLength(2);
        expect(results.map((r) => r.dateField)).toEqual(
            expect.arrayContaining(["2024-05-14", "2024-05-15"]),
        );
    });

    it("lt query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { lt: "2024-05-15" },
            },
        });
        expect(results).toHaveLength(1);
        expect(results[0].dateField).toBe("2024-05-14");
    });

    it("isNull query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { isNull: true },
            },
        });
        expect(results).toHaveLength(0);
    });

    it("isNotNull query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { isNull: false },
            },
        });
        expect(results).toHaveLength(3);
    });

    it("between query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { gte: "2024-05-14", lte: "2024-05-15" },
            },
        });
        expect(results).toHaveLength(2);
        expect(results.map((r) => r.dateField)).toEqual(
            expect.arrayContaining(["2024-05-14", "2024-05-15"]),
        );
    });

    it("notExist query", async () => {
        const results = await QueryDateModel.read({
            filter: {
                dateField: { notExist: false },
            },
        });
        expect(results instanceof FookieError).toBeTruthy();
    });
});
