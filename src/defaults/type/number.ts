import { Type } from "../../core/type";
import * as lodash from "lodash";

export const number = Type.new({
    key: "number",
    validate: function (value: unknown): boolean {
        return lodash.isNumber(value);
    },
    example: 1,
    queryController: {
        equals: {
            key: "number",
            validate: lodash.isNumber,
        },
        notEquals: {
            key: "number",
            validate: lodash.isNumber,
        },
        in: {
            key: "number",
            validate: lodash.isNumber,
            isArray: true,
        },
        notIn: {
            key: "number",
            validate: lodash.isNumber,
            isArray: true,
        },
        isNull: {
            key: "boolean",
            validate: lodash.isBoolean,
        },
        isNotNull: {
            key: "boolean",
            validate: lodash.isBoolean,
        },
    },
});
