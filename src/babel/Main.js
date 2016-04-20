"use strict";

var _LegoMan = require("./animation/mixer/LegoMan");

var _LegoMan2 = _interopRequireDefault(_LegoMan);

var _Controller = require("./controller/Controller");

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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