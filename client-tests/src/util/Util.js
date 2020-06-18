import * as Optional from "optional-js"

export default class Util {
    static containsAll(array1, array2) {

        for (let i = 0; i < array2.length; i++) {
            const a2 = array2[i]

            let isPresent = false
            for (let j = 0; j < array1.length; j++) {
                const a1 = array1[j]
                if (a1 === a2) {
                    isPresent = true
                }
            }

            if (!isPresent) {
                return false
            }
        }
        return true
    }

    static combineToArray(...a) {
        let arrayOut = []
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== undefined) {
                arrayOut.push(a[i])
            }
        }

        return arrayOut
    }

    static strMapToObj(strMap) {
        let obj = Object.create(null)
        for (let [k, v] of strMap) {
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
            obj[k] = v
        }
        return obj
    }

    static toClientBaseUrl(pathname, basename) {
        var clientBaseUrl = Optional.ofNullable(basename).map(b => pathname.replace(b, '')).orElse('')

        if (clientBaseUrl.endsWith('/')) {
            var lastIndex = clientBaseUrl.lastIndexOf('/')
            clientBaseUrl = clientBaseUrl.substring(0, lastIndex)
        }

        return clientBaseUrl
    }


    // static sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    //
    // static async defaultSleep(ms) {
    //     try {
    //         return await Util.sleep(ms)
    //     }
    //     catch (ignore) {
    //     }
    // }
}
