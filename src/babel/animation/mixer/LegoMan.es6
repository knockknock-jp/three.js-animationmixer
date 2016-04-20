const ROTATION_SPEED = 4;
const WALK_SPEED = 0.3;

/**
 * 新しいLegoManオブジェクトを作成する。
 * ＠class
 */
export default class LegoMan {

	static get TURN_LEFT() {
		return "turn_left";
	}

	static get TURN_RIGHT() {
		return "turn_right";
	}

	static get MOVE_FORWARD() {
		return "move_forward";
	}

	static get MOVE_BACKWARD() {
		return "move_backward";
	}

	constructor() {
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

	load() {
		return new Promise((resolve, reject)=> {
			var loader = new THREE.JSONLoader();
			loader.load("./models/legoman.json", (geometry, materials)=> {
				materials.forEach((material)=> {
					material.skinning = true;
				});
				this.meth_ = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
				this.meth_.castShadow = true;
				//this.meth_.receiveShadow = true;
				this.meth_.rotation.y = -90 * (Math.PI / 180);
				this.mixer_ = new THREE.AnimationMixer(this.meth_);
				this.defaultAction_ = new Action(this.mixer_.clipAction(geometry.animations[0]), 1, false);
				this.defaultAction_.play();
				this.jumpAction_ = new Action(this.mixer_.clipAction(geometry.animations[1]), 0, false);
				this.walkAction_ = new Action(this.mixer_.clipAction(geometry.animations[3]), 0, true);
				resolve(this.meth_);
			});
		})
	}

	update(delta) {
		if (!this.meth_) return;
		if (!this.mixer_) return;
		//
		this.mixer_.update(delta);
	}
	
	startTurn(key) {
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
		this.intervalId_ = setInterval(()=>{
			this.rotation += rot;
		}, 1000 / 30);
	}

	endTurn() {
		if (!this.meth_) return;
		//
		if (this.intervalId_) clearInterval(this.intervalId_);
	}

	startWalk(key) {
		if (!this.meth_) return;
		if (this.walkAction_.isRunning) return;
		this.walkAction_.isRunning = true;
		//
		this.moveId_ = key;
		this.defaultAction_.play();
		this.defaultAction_.toWeight(0, 3000, "linear", (data)=>{
			this.defaultAction_.setAction(data);
		}).then(()=>{
			this.defaultAction_.reset();
		});
		this.walkAction_.play();
		this.walkAction_.toWeight(1, 3000, "linear", (data)=>{
			this.walkAction_.setAction(data);
		});
		//
		if (this.intervalId2_) clearInterval(this.intervalId2_);
		this.intervalId2_ = setInterval(()=>{
			var dist = 0;
			switch (this.moveId_) {
				case LegoMan.MOVE_FORWARD:
					dist = -WALK_SPEED * this.walkAction_.weight;
					break;
				case LegoMan.MOVE_BACKWARD:
					dist = WALK_SPEED * this.walkAction_.weight;
					break;
			}
			var rad = (Math.PI / 180) * this.rotation;
			this.x += Math.cos(rad) * dist;
			this.y += Math.sin(rad) * dist;
		}, 1000 / 30);
	}

	endWalk() {
		if (!this.meth_) return;
		if (!this.walkAction_.isRunning) return;
		this.walkAction_.isRunning = false;
		//
		this.defaultAction_.play();
		this.defaultAction_.toWeight(1, 500, "linear", (data)=>{
			this.defaultAction_.setAction(data);
		}).then(()=>{
			this.defaultAction_.reset();
		});
		this.walkAction_.play();
		this.walkAction_.toWeight(0, 500, "linear", (data)=>{
			this.walkAction_.setAction(data);
		}).then(()=>{
			if (this.intervalId2_) clearInterval(this.intervalId2_);
			this.walkAction_.reset();
		});
	}

	startJump() {
		if (!this.meth_) return;
		if (this.jumpAction_.isRunning) return;
		this.jumpAction_.isRunning = true;
		//
		this.jumpAction_.weight = 0;
		this.jumpAction_.reset();
		this.jumpAction_.play();
		this.jumpAction_.toWeight(1, 400, "easeOutQuint", (data)=>{
			this.jumpAction_.setAction(data);
			this.defaultAction_.setAction(this.defaultAction_.weight * (1 - data));
			this.walkAction_.setAction(this.walkAction_.weight * (1 - data));
		}).then(()=>{
			this.jumpAction_.toWeight(0, 400, "easeInQuint", (data)=>{
				this.jumpAction_.setAction(data);
				this.defaultAction_.setAction(this.defaultAction_.weight * (1 - data));
				this.walkAction_.setAction(this.walkAction_.weight * (1 - data));
			}).then(()=>{
				this.jumpAction_.isRunning = false;
			});
		});
	}

	endJump() {
		if (!this.meth_) return;
		//
		this.jumpAction_.play();
		this.jumpAction_.toWeight(0, 400, "easeInQuint", (data)=>{
			this.jumpAction_.setAction(data);
			this.defaultAction_.setAction(this.defaultAction_.weight * (1 - data));
			this.walkAction_.setAction(this.walkAction_.weight * (1 - data));
		}).then(()=>{
			this.jumpAction_.isRunning = false;
		});
	}

	set x(val) {
		this.x_ = val;
		this.meth_.position.x = this.x_;
	}

	get x() {
		return this.x_;
	}

	set y(val) {
		this.y_ = val;
		this.meth_.position.z = this.y_;
	}

	get y() {
		return this.y_;
	}

	set rotation(val) {
		val %= 360;
		if (val < 0) {
			val += 360;
		}
		this.rotation_ = val;
		this.meth_.rotation.y = -(this.rotation_ * (Math.PI / 180)) + (-90 * (Math.PI / 180));
	}

	get rotation() {
		return this.rotation_;
	}

}

/**
 * 新しいActionオブジェクトを作成する。
 * ＠class
 */
class Action {

	constructor(action, weight = 0, isRoop = true) {
		this.action_ = action;
		this.weight_ = weight;
		if (!isRoop) this.action_.setLoop(THREE.LoopOnce, 0);
		this.isRunning_ = false;
		this.weight = this.weight_;
	}

	play() {
		if (this.action_) this.action_.play();
	}

	reset() {
		if (this.action_) this.action_.reset();
	}

	toWeight(target, duration, easing = "linear", step) {
		return new Promise((resolve, reject)=> {
			$(this).stop().animate({
				weight: target
			}, {
				duration: duration,
				easing: easing,
				step: ()=>{
					step(this.weight);
				},
				complete: ()=>{
					resolve();
				}
			});
		});
	}

	setAction(val) {
		if (this.action_) this.action_.setEffectiveWeight(val);
	}

	set weight(val) {
		if (val < 0) val = 0;
		if (1 < val) val = 1;
		this.weight_ = val;
	}

	get weight() {
		return this.weight_;
	}

	set isRunning(flg) {
		this.isRunning_ = flg;
	}

	get isRunning() {
		return this.isRunning_;
	}

}