import { FookieError } from "../../error"
import { after } from "../../mixin/src/binds/after"
import { before } from "../../mixin/src/binds/before"
import { Payload } from "../../payload"

const rule = async function (payload: Payload<any>, error: FookieError): Promise<boolean> {
    const rules = [
        ...before[payload.method].rule,
        ...payload.model.binds![payload.method].rule,
        ...after[payload.method].rule,
    ]

    for (const rule of rules) {
        const start = Date.now()
        const res = await rule.execute(payload, error)
        payload.state.metrics.lifecycle.push({
            name: rule.key,
            ms: Date.now() - start,
        })

        if (res === false) {
            error.key = rule.key
            return false
        }
    }
    return true
}

export default rule
