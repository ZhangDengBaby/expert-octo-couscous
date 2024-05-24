<template>
  <div class="three">
    <div id="carrier"></div>
  </div>
</template>

<script lang="ts">
// 导入Three.js
import * as THREE from 'three';
// 导入控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 导入水面
import { Water } from 'three/examples/jsm/objects/Water2'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { defineComponent, ref, reactive, onMounted } from 'vue'
export default defineComponent({
  setup() {
    // 初始化场景
    const scene = new THREE.Scene();
    // 初始化相机（透视相机）
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
    // 设置相机位置
    camera.position.set(-50, 50, 130)
    // 更新摄像头宽高比例
    camera.aspect = window.innerWidth / (window.innerHeight - 62)
    // 更新摄像头投影矩阵
    camera.updateProjectionMatrix()
    // 将相机添加到场景中
    scene.add(camera)
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({
      // 设置抗锯齿
      antialias: true
    })
    // 设置输出环境编码
    renderer.outputEncoding = THREE.sRGBEncoding
    // 设置渲染器宽高
    renderer.setSize( window.innerWidth, window.innerHeight - 62 )
    // 监听屏幕大小的改变，修改渲染器的宽高和相机的比例
    const ReRender = () => {
      camera.aspect = window.innerWidth / (window.innerHeight - 62)
      camera.updateProjectionMatrix()
      renderer.setSize( window.innerWidth, window.innerHeight - 62 )
    }

    // 实例化控制器(首次加载新的控制器需重启项目)
    const controls = new OrbitControls(camera, renderer.domElement)


    // 添加平面
    // const planeGeometry = new THREE.PlaneGeometry(100, 100)
    // const planeMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    // })
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // scene.add(plane)

    // 创建一个天空球
    const skyGeometry = new THREE.SphereGeometry(1000, 60, 60)
    const skyUrl = new URL('./img/sky.jpg', import.meta.url).href
    const skyMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(skyUrl), // 添加纹理
      // color: 0xffffff,
    })
    skyGeometry.scale(1, 1, -1)
    const sky = new THREE.Mesh(skyGeometry, skyMaterial)

    scene.add(sky)

    // 创建水面
    const waterGeometry = new THREE.CircleGeometry(300, 64)
    const water = new Water(waterGeometry, {
      textureHeight: 1024,
      textureWidth: 1024,
      color: '#fff',
      flowDirection: new THREE.Vector2(1, 1), // 水面流动方向
      scale: 2 // 水纹大小
    })
    // 水面旋转至水平
    water.rotation.x = -Math.PI / 2
    scene.add(water)

    // gui
    const params = {
				color: '#ffffff',
				scale: 4,
				flowX: 1,
				flowY: 1
			};
    const gui = new GUI();

    gui.addColor( params, 'color' ).onChange( function ( value ) {

      water.material.uniforms[ 'color' ].value.set( value );

    } );
    gui.add( params, 'scale', 1, 10 ).onChange( function ( value ) {

      water.material.uniforms[ 'config' ].value.w = value;

    } );
    gui.add( params, 'flowX', - 1, 1 ).step( 0.01 ).onChange( function ( value ) {

      water.material.uniforms[ 'flowDirection' ].value.x = value;
      water.material.uniforms[ 'flowDirection' ].value.normalize();

    } );
    gui.add( params, 'flowY', - 1, 1 ).step( 0.01 ).onChange( function ( value ) {

      water.material.uniforms[ 'flowDirection' ].value.y = value;
      water.material.uniforms[ 'flowDirection' ].value.normalize();

    } );

    gui.open();
    // 渲染场景并自动更新渲染器
    const render = () => {
      // water.material.uniforms['time'].value += 2.0 / 60.0;
      // 渲染场景
      renderer.render(scene, camera)
      // 引擎自动更新渲染器（浏览器自带，每帧处罚一次）
      requestAnimationFrame(render)
    }
    onMounted(() => {
      console.log(1111, water);
      
      // water.material.uniforms.time.value += 1.0 / 60.0
      window.addEventListener("resize", ReRender)
      // 将渲染器添加到页面（需要等dom挂载后添加，否则不成功）
      document.getElementById('carrier')?.appendChild(renderer.domElement)
      render()
    })

    return {
    }
  }
})
</script>
<style>
#carrier {
  width: 100vw;
  height: calc( 100vh - 62px);
}
/* @media (min-width: 1024px) {
  .three {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
