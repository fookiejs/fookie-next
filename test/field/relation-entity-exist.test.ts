import { describe, it, expect } from "vitest";
import { Field, Model, defaults } from "../../src/exports";
import { v4 } from "uuid";
import { FookieError } from "../../src/core/error";

describe("Relation", () => {
    @Model.Decorator({
        database: defaults.database.store,
    })
    class RelationExistParent extends Model {
        @Field.Decorator({ type: defaults.type.text })
        name: string;
    }

    @Model.Decorator({
        database: defaults.database.store,
    })
    class RelationExistChild extends Model {
        @Field.Decorator({ relation: RelationExistParent })
        parent: string;
    }

    it("Create a child for an existing parent", async () => {
        const entity = await RelationExistParent.create({ name: "John Doe" });
        const response = await RelationExistChild.create({ parent: entity.id });

        expect(response instanceof RelationExistChild).toBe(true);
    });

    it("Create a child for an not existing parent", async () => {
        const response = await RelationExistChild.create({ parent: v4() });

        expect(response instanceof FookieError).toBe(true);
        if (response instanceof FookieError) {
            expect(response.key).toBe("has_entity");
        }
    });
});
