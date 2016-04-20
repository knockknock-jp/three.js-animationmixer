const KEY_CODE_W = 87;
const KEY_CODE_A = 65;
const KEY_CODE_S = 83;
const KEY_CODE_D = 68;
const KEY_CODE_K = 75;
const KEY_CODE_L = 76;
const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SHIFT = 32;
const KEY_CODE_RETURN = 13;

/**
 * 新しいControllerオブジェクトを作成する。
 * ＠class
 */
export default class Controller {

    static get KEY_STATE_DOWN() {
        return "key_state_down";
    }

    static get KEY_STATE_UP() {
        return "key_state_up";
    }

    static get KEY_TYPE_UP() {
        return "key_type_up";
    }

    static get KEY_TYPE_LEFT_UP() {
        return "key_type_left_up";
    }

    static get KEY_TYPE_RIGHT_UP() {
        return "key_type_right_up";
    }

    static get KEY_TYPE_DOWN() {
        return "key_type_down";
    }

    static get KEY_TYPE_LEFT_DOWN() {
        return "key_type_left_down";
    }

    static get KEY_TYPE_RIGHT_DOWN() {
        return "key_type_right_down";
    }

    static get KEY_TYPE_LEFT() {
        return "key_type_left";
    }

    static get KEY_TYPE_RIGHT() {
        return "key_type_right";
    }

    static get KEY_TYPE_A() {
        return "key_type_a";
    }

    static get KEY_TYPE_B() {
        return "key_type_b";
    }

    constructor($target, cb) {
        this.$target_ = $target;
        this.callBackFunction_ = cb;
        //
        this.isPressedKeyUp_ = false;
        this.isPressedKeyLeftUp_ = false;
        this.isPressedKeyRightUp_ = false;
        this.isPressedKeyLeft_ = false;
        this.isPressedKeyRight_ = false;
        this.isPressedKeyDown_ = false;
        this.isPressedKeyLeftDown_ = false;
        this.isPressedKeyRightDown_ = false;
        this.isPressedKeyA_ = false;
        this.isPressedKeyB_ = false;
        this.$window_ = $(window);
        this.startTouchEvent_ = null;
        this.endTouchEvent_ = null;
        this.mouseLeaveEvent_ = null;
        if(0 <= navigator.userAgent.search(/iPhone/)) {
            this.startTouchEvent_ = "touchstart";
            this.endTouchEvent_ = "touchend";
        } else {
            this.startTouchEvent_ = "mousedown";
            this.endTouchEvent_ = "mouseup";
            this.mouseLeaveEvent_ = "mouseleave";
        }
    }
    
    addListener() {
        if (!this.callBackFunction_) return;
        //
        this.$target_.each((i, element)=>{
            $(element).on("click", (e)=> {
                this.onClick_(e);
            });
            $(element).on(this.startTouchEvent_, (e)=> {
                this.onStartTouch_(e);
            });
            $(element).on(this.endTouchEvent_, (e)=> {
                this.onEndTouch_(e);
            });
            if (this.mouseLeaveEvent_) {
                $(element).on(this.mouseLeaveEvent_, (e)=> {
                    this.onEndTouch_(e);
                });
            }
        });
        this.$window_.on("keydown", (e)=> {
            this.onKeyDown_(e);
        });
        this.$window_.on("keyup", (e)=> {
            this.onKeyUp_(e);
        });
    }

    removeListener() {
        if (!this.callBackFunction_) return;
        //
        this.$target_.each((i, element)=>{
            $(element).off("click", (e)=> {
                this.onClick_(e);
            });
            $(element).off(this.startTouchEvent_, (e)=> {
                this.onStartTouch_(e);
            });
            $(element).off(this.endTouchEvent_, (e)=> {
                this.onEndTouch_(e);
            });
            if (this.mouseLeaveEvent_) {
                $(element).off(this.mouseLeaveEvent_, (e)=> {
                    this.onEndTouch_(e);
                });
            }
        });
        this.$window_.off("keydown", (e)=> {
            this.onKeyDown_(e);
        });
        this.$window_.off("keyup", (e)=> {
            this.onKeyUp_(e);
        });
    }

    onClick_(e) {
        e.preventDefault();
    }

    onStartTouch_(e) {
        e.preventDefault();
        switch($(e.currentTarget).attr("data-id")){
            case Controller.KEY_TYPE_UP:
                this.isPressedKeyUp_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_UP);
                break;
            case Controller.KEY_TYPE_LEFT_UP:
                this.isPressedKeyLeftUp_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT_UP);
                break;
            case Controller.KEY_TYPE_RIGHT_UP:
                this.isPressedKeyRightUp_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT_UP);
                break;
            case Controller.KEY_TYPE_DOWN:
                this.isPressedKeyDown_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_DOWN);
                break;
            case Controller.KEY_TYPE_LEFT_DOWN:
                this.isPressedKeyLeftDown_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT_DOWN);
                break;
            case Controller.KEY_TYPE_RIGHT_DOWN:
                this.isPressedKeyRightDown_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT_DOWN);
                break;
            case Controller.KEY_TYPE_LEFT:
                this.isPressedKeyLeft_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT);
                break;
            case Controller.KEY_TYPE_RIGHT:
                this.isPressedKeyRight_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT);
                break;
            case Controller.KEY_TYPE_A:
                this.isPressedKeyA_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_A);
                break;
            case Controller.KEY_TYPE_B:
                this.isPressedKeyB_ = true;
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_B);
                break;
        }
    }
    
    onEndTouch_(e) {
        e.preventDefault();
        switch($(e.currentTarget).attr("data-id")){
            case Controller.KEY_TYPE_UP:
                if (!this.isPressedKeyUp_) return;
                this.isPressedKeyUp_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_UP);
                break;
            case Controller.KEY_TYPE_LEFT_UP:
                if (!this.isPressedKeyLeftUp_) return;
                this.isPressedKeyLeftUp_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT_UP);
                break;
            case Controller.KEY_TYPE_RIGHT_UP:
                if (!this.isPressedKeyRightUp_) return;
                this.isPressedKeyRightUp_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT_UP);
                break;
            case Controller.KEY_TYPE_DOWN:
                if (!this.isPressedKeyDown_) return;
                this.isPressedKeyDown_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_DOWN);
                break;
            case Controller.KEY_TYPE_LEFT_DOWN:
                if (!this.isPressedKeyLeftDown_) return;
                this.isPressedKeyLeftDown_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT_DOWN);
                break;
            case Controller.KEY_TYPE_RIGHT_DOWN:
                if (!this.isPressedKeyRightDown_) return;
                this.isPressedKeyRightDown_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT_DOWN);
                break;
            case Controller.KEY_TYPE_LEFT:
                if (!this.isPressedKeyLeft_) return;
                this.isPressedKeyLeft_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT);
                break;
            case Controller.KEY_TYPE_RIGHT:
                if (!this.isPressedKeyRight_) return;
                this.isPressedKeyRight_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT);
                break;
            case Controller.KEY_TYPE_A:
                if (!this.isPressedKeyA_) return;
                this.isPressedKeyA_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_A);
                break;
            case Controller.KEY_TYPE_B:
                if (!this.isPressedKeyB_) return;
                this.isPressedKeyB_ = false;
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_B);
                break;
        }
    }

    onKeyDown_(e) {
        switch (e.keyCode) {
            case KEY_CODE_LEFT:
            case KEY_CODE_A:
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_LEFT);
                break;
            case KEY_CODE_UP:
            case KEY_CODE_W:
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_UP);
                break;
            case KEY_CODE_RIGHT:
            case KEY_CODE_D:
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_RIGHT);
                break;
            case KEY_CODE_DOWN:
            case KEY_CODE_S:
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_DOWN);
                break;
            case KEY_CODE_K:
            case KEY_CODE_SHIFT:
            case KEY_CODE_RETURN:
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_A);
                break;
            case KEY_CODE_L:
                this.callBackFunction_(Controller.KEY_STATE_UP, Controller.KEY_TYPE_B);
                break;
        }
    }

    onKeyUp_(e) {
        switch (e.keyCode) {
            case KEY_CODE_LEFT:
            case KEY_CODE_A:
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_LEFT);
                break;
            case KEY_CODE_UP:
            case KEY_CODE_W:
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_UP);
                break;
            case KEY_CODE_RIGHT:
            case KEY_CODE_D:
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_RIGHT);
                break;
            case KEY_CODE_DOWN:
            case KEY_CODE_S:
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_DOWN);
                break;
            case KEY_CODE_K:
            case KEY_CODE_SHIFT:
            case KEY_CODE_RETURN:
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_A);
                break;
            case KEY_CODE_L:
                this.callBackFunction_(Controller.KEY_STATE_DOWN, Controller.KEY_TYPE_B);
                break;
        }
    }

}