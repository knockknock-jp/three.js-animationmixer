"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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