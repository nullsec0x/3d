import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 25;

/* center sphere */

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshBasicMaterial({
        color: 0x1f1f1f
    })
);

scene.add(sphere);

/* orbit ring */

const ring = new THREE.Mesh(
    new THREE.TorusGeometry(7, 0.15, 16, 100),
    new THREE.MeshBasicMaterial({
        color: 0xd6d6d6
    })
);

ring.rotation.x = 1;
ring.rotation.y = 0.5;

scene.add(ring);

/* stars */

function addStar(){

    const star = new THREE.Mesh(

        new THREE.SphereGeometry(
            0.08,
            6,
            6
        ),

        new THREE.MeshBasicMaterial({
            color: 0x999999
        })

    );

    const [x, y, z] = Array(3)
        .fill()
        .map(() =>
            THREE.MathUtils.randFloatSpread(150)
        );

    star.position.set(x, y, z);

    scene.add(star);
}

Array(150)
    .fill()
    .forEach(addStar);

/* scroll */

function moveCamera(){

    const t =
        document.body
        .getBoundingClientRect()
        .top;

    sphere.rotation.y += 0.02;
    sphere.rotation.z += 0.01;

    ring.rotation.x += 0.03;
    ring.rotation.y += 0.03;

    camera.position.z =
        25 + (t * -0.002);
}

document.body.onscroll = moveCamera;

moveCamera();

/* animation */

function animate(){

    requestAnimationFrame(animate);

    sphere.rotation.y += 0.007;
    sphere.rotation.x += 0.007;

    ring.rotation.x += 0.006;
    ring.rotation.y += 0.006;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
