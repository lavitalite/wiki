/**
 * bitwise flag so we can combine to chekc multi error
 */
export var NavigationFailureType;
(function (NavigationFailureType) {
    /**
     * An aborted navigation is a navigation that failed because
     * a navigation guard return `false` or callled `next(false)`
     */
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    /**
     * A cancelled navigation is a navigation that failed because a more recent
     * navigation finish started
     */
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    /**
     * A duplicated navigation is a navigation that failed because it was
     * initiated while already being at the exact same location
     */
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
