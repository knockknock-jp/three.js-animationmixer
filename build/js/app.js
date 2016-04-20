/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var KEY_CODE_W = 87;
	var KEY_CODE_A = 65;
	var KEY_CODE_S = 83;
	var KEY_CODE_D = 68;
	var KEY_CODE_K = 75;
	var KEY_CODE_L = 76;
	var KEY_CODE_UP = 38;
	var KEY_CODE_DOWN = 40;
	var KEY_CODE_LEFT = 37;
	var KEY_CODE_RIGHT = 39;
	var KEY_CODE_SHIFT = 32;
	var KEY_CODE_RETURN = 13;

	/**
	 * 新しいControllerオブジェクトを作成する。
	 * ＠class
	 */

	var Controller = function () {
	    _createClass(Controller, null, [{
	        key: "KEY_STATE_DOWN",
	        get: function get() {
	            return "key_state_down";
	        }
	    }, {
	        key: "KEY_STATE_UP",
	        get: function get() {
	            return "key_state_up";
	        }
	    }, {
	        key: "KEY_TYPE_UP",
	        get: function get() {
	            return "key_type_up";
	        }
	    }, {
	        key: "KEY_TYPE_LEFT_UP",
	        get: function get() {
	            return "key_type_left_up";
	        }
	    }, {
	        key: "KEY_TYPE_RIGHT_UP",
	        get: function get() {
	            return "key_type_right_up";
	        }
	    }, {
	        key: "KEY_TYPE_DOWN",
	        get: function get() {
	            return "key_type_down";
	        }
	    }, {
	        key: "KEY_TYPE_LEFT_DOWN",
	        get: function get() {
	            return "key_type_left_down";
	        }
	    }, {
	        key: "KEY_TYPE_RIGHT_DOWN",
	        get: function get() {
	            return "key_type_right_down";
	        }
	    }, {
	        key: "KEY_TYPE_LEFT",
	        get: function get() {
	            return "key_type_left";
	        }
	    }, {
	        key: "KEY_TYPE_RIGHT",
	        get: function get() {
	            return "key_type_right";
	        }
	    }, {
	        key: "KEY_TYPE_A",
	        get: function get() {
	            return "key_type_a";
	        }
	    }, {
	        key: "KEY_TYPE_B",
	        get: function get() {
	            return "key_type_b";
	        }
	    }]);

	    function Controller($target, cb) {
	        _classCallCheck(this, Controller);

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
	        if (0 <= navigator.userAgent.search(/iPhone/)) {
	            this.startTouchEvent_ = "touchstart";
	            this.endTouchEvent_ = "touchend";
	        } else {
	            this.startTouchEvent_ = "mousedown";
	            this.endTouchEvent_ = "mouseup";
	            this.mouseLeaveEvent_ = "mouseleave";
	        }
	    }

	    _createClass(Controller, [{
	        key: "addListener",
	        value: function addListener() {
	            var _this = this;

	            if (!this.callBackFunction_) return;
	            //
	            this.$target_.each(function (i, element) {
	                $(element).on("click", function (e) {
	                    _this.onClick_(e);
	                });
	                $(element).on(_this.startTouchEvent_, function (e) {
	                    _this.onStartTouch_(e);
	                });
	                $(element).on(_this.endTouchEvent_, function (e) {
	                    _this.onEndTouch_(e);
	                });
	                if (_this.mouseLeaveEvent_) {
	                    $(element).on(_this.mouseLeaveEvent_, function (e) {
	                        _this.onEndTouch_(e);
	                    });
	                }
	            });
	            this.$window_.on("keydown", function (e) {
	                _this.onKeyDown_(e);
	            });
	            this.$window_.on("keyup", function (e) {
	                _this.onKeyUp_(e);
	            });
	        }
	    }, {
	        key: "removeListener",
	        value: function removeListener() {
	            var _this2 = this;

	            if (!this.callBackFunction_) return;
	            //
	            this.$target_.each(function (i, element) {
	                $(element).off("click", function (e) {
	                    _this2.onClick_(e);
	                });
	                $(element).off(_this2.startTouchEvent_, function (e) {
	                    _this2.onStartTouch_(e);
	                });
	                $(element).off(_this2.endTouchEvent_, function (e) {
	                    _this2.onEndTouch_(e);
	                });
	                if (_this2.mouseLeaveEvent_) {
	                    $(element).off(_this2.mouseLeaveEvent_, function (e) {
	                        _this2.onEndTouch_(e);
	                    });
	                }
	            });
	            this.$window_.off("keydown", function (e) {
	                _this2.onKeyDown_(e);
	            });
	            this.$window_.off("keyup", function (e) {
	                _this2.onKeyUp_(e);
	            });
	        }
	    }, {
	        key: "onClick_",
	        value: function onClick_(e) {
	            e.preventDefault();
	        }
	    }, {
	        key: "onStartTouch_",
	        value: function onStartTouch_(e) {
	            e.preventDefault();
	            switch ($(e.currentTarget).attr("data-id")) {
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
	    }, {
	        key: "onEndTouch_",
	        value: function onEndTouch_(e) {
	            e.preventDefault();
	            switch ($(e.currentTarget).attr("data-id")) {
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
	    }, {
	        key: "onKeyDown_",
	        value: function onKeyDown_(e) {
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
	    }, {
	        key: "onKeyUp_",
	        value: function onKeyUp_(e) {
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
	    }]);

	    return Controller;
	}();

	exports.default = Controller;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ROTATION_SPEED = 4;
	var WALK_SPEED = 0.3;

	/**
	 * 新しいLegoManオブジェクトを作成する。
	 * ＠class
	 */

	var LegoMan = function () {
		_createClass(LegoMan, null, [{
			key: "TURN_LEFT",
			get: function get() {
				return "turn_left";
			}
		}, {
			key: "TURN_RIGHT",
			get: function get() {
				return "turn_right";
			}
		}, {
			key: "MOVE_FORWARD",
			get: function get() {
				return "move_forward";
			}
		}, {
			key: "MOVE_BACKWARD",
			get: function get() {
				return "move_backward";
			}
		}]);

		function LegoMan() {
			_classCallCheck(this, LegoMan);

			this.meth_ = null;
			this.mixer_ = null;
			this.rotation_ = 0;
			this.x_ = 0;
			this.y_ = 0;
			this.defaultAction_ = null;
			this.walkAction_ = null;
			this.jumpAction_ = null;
			this.intervalId_ = null;
			this.intervalId2_ = null;
			this.moveId_ = null;
		}

		_createClass(LegoMan, [{
			key: "load",
			value: function load() {
				var _this = this;

				return new Promise(function (resolve, reject) {
					var loader = new THREE.JSONLoader();
					loader.load("./models/legoman.json", function (geometry, materials) {
						materials.forEach(function (material) {
							material.skinning = true;
						});
						_this.meth_ = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
						_this.meth_.castShadow = true;
						//this.meth_.receiveShadow = true;
						_this.meth_.rotation.y = -90 * (Math.PI / 180);
						_this.mixer_ = new THREE.AnimationMixer(_this.meth_);
						_this.defaultAction_ = new Action(_this.mixer_.clipAction(geometry.animations[0]), 1, false);
						_this.defaultAction_.play();
						_this.jumpAction_ = new Action(_this.mixer_.clipAction(geometry.animations[1]), 0, false);
						_this.walkAction_ = new Action(_this.mixer_.clipAction(geometry.animations[3]), 0, true);
						resolve(_this.meth_);
					});
				});
			}
		}, {
			key: "update",
			value: function update(delta) {
				if (!this.meth_) return;
				if (!this.mixer_) return;
				//
				this.mixer_.update(delta);
			}
		}, {
			key: "startTurn",
			value: function startTurn(key) {
				var _this2 = this;

				if (!this.meth_) return;
				//
				var rot = 0;
				switch (key) {
					case LegoMan.TURN_LEFT:
						rot = -ROTATION_SPEED;
						break;
					case LegoMan.TURN_RIGHT:
						rot = ROTATION_SPEED;
						break;
				}
				if (this.intervalId_) clearInterval(this.intervalId_);
				this.intervalId_ = setInterval(function () {
					_this2.rotation += rot;
				}, 1000 / 30);
			}
		}, {
			key: "endTurn",
			value: function endTurn() {
				if (!this.meth_) return;
				//
				if (this.intervalId_) clearInterval(this.intervalId_);
			}
		}, {
			key: "startWalk",
			value: function startWalk(key) {
				var _this3 = this;

				if (!this.meth_) return;
				if (this.walkAction_.isRunning) return;
				this.walkAction_.isRunning = true;
				//
				this.moveId_ = key;
				this.defaultAction_.play();
				this.defaultAction_.toWeight(0, 3000, "linear", function (data) {
					_this3.defaultAction_.setAction(data);
				}).then(function () {
					_this3.defaultAction_.reset();
				});
				this.walkAction_.play();
				this.walkAction_.toWeight(1, 3000, "linear", function (data) {
					_this3.walkAction_.setAction(data);
				});
				//
				if (this.intervalId2_) clearInterval(this.intervalId2_);
				this.intervalId2_ = setInterval(function () {
					var dist = 0;
					switch (_this3.moveId_) {
						case LegoMan.MOVE_FORWARD:
							dist = -WALK_SPEED * _this3.walkAction_.weight;
							break;
						case LegoMan.MOVE_BACKWARD:
							dist = WALK_SPEED * _this3.walkAction_.weight;
							break;
					}
					var rad = Math.PI / 180 * _this3.rotation;
					_this3.x += Math.cos(rad) * dist;
					_this3.y += Math.sin(rad) * dist;
				}, 1000 / 30);
			}
		}, {
			key: "endWalk",
			value: function endWalk() {
				var _this4 = this;

				if (!this.meth_) return;
				if (!this.walkAction_.isRunning) return;
				this.walkAction_.isRunning = false;
				//
				this.defaultAction_.play();
				this.defaultAction_.toWeight(1, 500, "linear", function (data) {
					_this4.defaultAction_.setAction(data);
				}).then(function () {
					_this4.defaultAction_.reset();
				});
				this.walkAction_.play();
				this.walkAction_.toWeight(0, 500, "linear", function (data) {
					_this4.walkAction_.setAction(data);
				}).then(function () {
					if (_this4.intervalId2_) clearInterval(_this4.intervalId2_);
					_this4.walkAction_.reset();
				});
			}
		}, {
			key: "startJump",
			value: function startJump() {
				var _this5 = this;

				if (!this.meth_) return;
				if (this.jumpAction_.isRunning) return;
				this.jumpAction_.isRunning = true;
				//
				this.jumpAction_.weight = 0;
				this.jumpAction_.reset();
				this.jumpAction_.play();
				this.jumpAction_.toWeight(1, 400, "easeOutQuint", function (data) {
					_this5.jumpAction_.setAction(data);
					_this5.defaultAction_.setAction(_this5.defaultAction_.weight * (1 - data));
					_this5.walkAction_.setAction(_this5.walkAction_.weight * (1 - data));
				}).then(function () {
					_this5.jumpAction_.toWeight(0, 400, "easeInQuint", function (data) {
						_this5.jumpAction_.setAction(data);
						_this5.defaultAction_.setAction(_this5.defaultAction_.weight * (1 - data));
						_this5.walkAction_.setAction(_this5.walkAction_.weight * (1 - data));
					}).then(function () {
						_this5.jumpAction_.isRunning = false;
					});
				});
			}
		}, {
			key: "endJump",
			value: function endJump() {
				var _this6 = this;

				if (!this.meth_) return;
				//
				this.jumpAction_.play();
				this.jumpAction_.toWeight(0, 400, "easeInQuint", function (data) {
					_this6.jumpAction_.setAction(data);
					_this6.defaultAction_.setAction(_this6.defaultAction_.weight * (1 - data));
					_this6.walkAction_.setAction(_this6.walkAction_.weight * (1 - data));
				}).then(function () {
					_this6.jumpAction_.isRunning = false;
				});
			}
		}, {
			key: "x",
			set: function set(val) {
				this.x_ = val;
				this.meth_.position.x = this.x_;
			},
			get: function get() {
				return this.x_;
			}
		}, {
			key: "y",
			set: function set(val) {
				this.y_ = val;
				this.meth_.position.z = this.y_;
			},
			get: function get() {
				return this.y_;
			}
		}, {
			key: "rotation",
			set: function set(val) {
				val %= 360;
				if (val < 0) {
					val += 360;
				}
				this.rotation_ = val;
				this.meth_.rotation.y = -(this.rotation_ * (Math.PI / 180)) + -90 * (Math.PI / 180);
			},
			get: function get() {
				return this.rotation_;
			}
		}]);

		return LegoMan;
	}();

	/**
	 * 新しいActionオブジェクトを作成する。
	 * ＠class
	 */

	exports.default = LegoMan;

	var Action = function () {
		function Action(action) {
			var weight = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var isRoop = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

			_classCallCheck(this, Action);

			this.action_ = action;
			this.weight_ = weight;
			if (!isRoop) this.action_.setLoop(THREE.LoopOnce, 0);
			this.isRunning_ = false;
			this.weight = this.weight_;
		}

		_createClass(Action, [{
			key: "play",
			value: function play() {
				if (this.action_) this.action_.play();
			}
		}, {
			key: "reset",
			value: function reset() {
				if (this.action_) this.action_.reset();
			}
		}, {
			key: "toWeight",
			value: function toWeight(target, duration) {
				var _this7 = this;

				var easing = arguments.length <= 2 || arguments[2] === undefined ? "linear" : arguments[2];
				var _step = arguments[3];

				return new Promise(function (resolve, reject) {
					$(_this7).stop().animate({
						weight: target
					}, {
						duration: duration,
						easing: easing,
						step: function step() {
							_step(_this7.weight);
						},
						complete: function complete() {
							resolve();
						}
					});
				});
			}
		}, {
			key: "setAction",
			value: function setAction(val) {
				if (this.action_) this.action_.setEffectiveWeight(val);
			}
		}, {
			key: "weight",
			set: function set(val) {
				if (val < 0) val = 0;
				if (1 < val) val = 1;
				this.weight_ = val;
			},
			get: function get() {
				return this.weight_;
			}
		}, {
			key: "isRunning",
			set: function set(flg) {
				this.isRunning_ = flg;
			},
			get: function get() {
				return this.isRunning_;
			}
		}]);

		return Action;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _LegoMan = __webpack_require__(2);

	var _LegoMan2 = _interopRequireDefault(_LegoMan);

	var _Controller = __webpack_require__(1);

	var _Controller2 = _interopRequireDefault(_Controller);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var STAGE_WIDTH = 800;
	var STAGE_HEIGHT = 600;

	// シーン
	var scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x000000, 0.005);

	// カメラ
	var camera = new THREE.PerspectiveCamera(30, STAGE_WIDTH / STAGE_HEIGHT, 1, 5000);
	camera.position.z = -15;
	camera.position.x = -20;
	camera.position.y = 20;
	scene.add(camera);
	camera.lookAt(scene.position);

	// ライト
	var light = new THREE.DirectionalLight(0x666666, 2);
	light.position.set(-500, 500, 100);
	light.castShadow = true;
	light.shadow.camera.far = 2000;
	light.shadow.camera.left = -50;
	light.shadow.camera.right = 50;
	light.shadow.camera.top = 50;
	light.shadow.camera.bottom = -50;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	scene.add(light);
	var ambientLight = new THREE.AmbientLight(0x999999);
	scene.add(ambientLight);

	// フィールド
	var loader = new THREE.TextureLoader();
	var texture = loader.load("./texture/field.jpg");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(200, 200);
	var material = new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x333333, map: texture, bumpMap: texture, bumpScale: 0.5 });
	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), material);
	mesh.rotation.x = -Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add(mesh);

	// レゴ
	var legoMan = new _LegoMan2.default();
	var legoManMesh = null;
	legoMan.load().then(function (data) {
	    legoManMesh = data;
	    scene.add(legoManMesh);
	});

	// レンダラー
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.setSize(STAGE_WIDTH, STAGE_HEIGHT);
	renderer.setClearColor(0x000000);
	document.getElementById("js_content").appendChild(renderer.domElement);
	var clock = new THREE.Clock();
	setInterval(function () {
	    var delta = clock.getDelta();
	    legoMan.update(delta);
	    renderer.render(scene, camera);
	    camera.lookAt({ x: legoMan.x, z: legoMan.y, y: 0 });
	}, 1000 / 30);

	// コントローラー
	var controller = new _Controller2.default($(".js_controllerButton"), function (keyState, keyType) {
	    switch (keyState) {
	        case _Controller2.default.KEY_STATE_UP:
	            switch (keyType) {
	                case _Controller2.default.KEY_TYPE_UP:
	                    legoMan.startWalk(_LegoMan2.default.MOVE_FORWARD);
	                    break;
	                case _Controller2.default.KEY_TYPE_LEFT_UP:
	                    legoMan.startWalk(_LegoMan2.default.MOVE_FORWARD);
	                    legoMan.startTurn(_LegoMan2.default.TURN_LEFT);
	                    break;
	                case _Controller2.default.KEY_TYPE_RIGHT_UP:
	                    legoMan.startWalk(_LegoMan2.default.MOVE_FORWARD);
	                    legoMan.startTurn(_LegoMan2.default.TURN_RIGHT);
	                    break;
	                case _Controller2.default.KEY_TYPE_LEFT:
	                    legoMan.startTurn(_LegoMan2.default.TURN_LEFT);
	                    break;
	                case _Controller2.default.KEY_TYPE_RIGHT:
	                    legoMan.startTurn(_LegoMan2.default.TURN_RIGHT);
	                    break;
	                case _Controller2.default.KEY_TYPE_LEFT_DOWN:
	                    legoMan.startWalk(_LegoMan2.default.MOVE_BACKWARD);
	                    legoMan.startTurn(_LegoMan2.default.TURN_LEFT);
	                    break;
	                case _Controller2.default.KEY_TYPE_RIGHT_DOWN:
	                    legoMan.startWalk(_LegoMan2.default.MOVE_BACKWARD);
	                    legoMan.startTurn(_LegoMan2.default.TURN_RIGHT);
	                    break;
	                case _Controller2.default.KEY_TYPE_DOWN:
	                    legoMan.startWalk(_LegoMan2.default.MOVE_BACKWARD);
	                    break;
	                case _Controller2.default.KEY_TYPE_A:
	                case _Controller2.default.KEY_TYPE_B:
	                    legoMan.startJump();
	                    break;
	            }
	            break;
	        case _Controller2.default.KEY_STATE_DOWN:
	            switch (keyType) {
	                case _Controller2.default.KEY_TYPE_UP:
	                    legoMan.endWalk();
	                    break;
	                case _Controller2.default.KEY_TYPE_LEFT_UP:
	                    legoMan.endWalk();
	                    legoMan.endTurn();
	                    break;
	                case _Controller2.default.KEY_TYPE_RIGHT_UP:
	                    legoMan.endWalk();
	                    legoMan.endTurn();
	                    break;
	                case _Controller2.default.KEY_TYPE_LEFT:
	                    legoMan.endTurn();
	                    break;
	                case _Controller2.default.KEY_TYPE_RIGHT:
	                    legoMan.endTurn();
	                    break;
	                case _Controller2.default.KEY_TYPE_LEFT_DOWN:
	                    legoMan.endWalk();
	                    legoMan.endTurn();
	                    break;
	                case _Controller2.default.KEY_TYPE_RIGHT_DOWN:
	                    legoMan.endWalk();
	                    legoMan.endTurn();
	                    break;
	                case _Controller2.default.KEY_TYPE_DOWN:
	                    legoMan.endWalk();
	                    break;
	                case _Controller2.default.KEY_TYPE_A:
	                case _Controller2.default.KEY_TYPE_B:
	                    legoMan.endJump();
	                    break;
	            }
	            break;
	    }
	});
	controller.addListener();

/***/ }
/******/ ]);