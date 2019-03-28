import Util from './Util'
import Optional from 'optional-js'
import {Language} from './Language'

export default class AppConstants {
    static defaultLanguage = Language.NO

    static reactComponentId() {
        return 'root'
    }

    static setDefaultLanguage(language) {
        AppConstants.defaultLanguage = language
    }

    static getLang() {
        return AppConstants.defaultLanguage
    }

    static getLangLowercase() {
        return AppConstants.defaultLanguage.toLowerCase()
    }

    static isNO() {
        return AppConstants.getLang() === Language.NO
    }

    static clientBaseUrl() {
        return Optional.ofNullable(document.getElementById('clientBaseUrl'))
            .map(element => element.getAttribute('value'))
            .map(val => Util.toClientBaseUrl(window.location.pathname, val))
            .orElse('')
    }

    static scrollToTop() {
        document.getElementById(AppConstants.reactComponentId()).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        return 1
    }

    static scrollToId(id) {
        return Optional.ofNullable(document.getElementById(id))
            .map(element => {
                element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
                return 1
            })
            .orElseGet(() => {
                console.log('Element ' + id + ' not found')
                return 0
            })
    }

    static scrollToBottomOfId(id) {
        return Optional.ofNullable(document.getElementById(id))
            .map(e => {
                console.log("Scrolling to " + e.id)
                e.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                return 1
            })
            .orElseGet(() => console.log("Element " + id + " not found"))
    }
}
