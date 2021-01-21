window.onload = draw_cg;  // イベントハンドラの設定
function draw_cg(){ // イベントハンドラ（関数）
  // １．シーンの作成
  var scene = new THREE.Scene();  // シーンの作成

  // ２．カメラの追加
  var fov = 80;  // 画角
  // 画面のアスペクト比（縦横比）
  var aspect = window.innerWidth / window.innerHeight;
  var near = 1;  // カメラが捉える範囲（近い方）
  var far = 1000;  // カメラが捉える範囲（遠い方）
  // カメラの設定
  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 0, 0, 30 );  // カメラを配置する位置（x,y,z）
  camera.rotation.set(Math.PI/60, Math.PI/60, 0);

  // ３．3Dオブジェクト（物体）の配置
  // 幅，高さ，奥行きが7の立方体の形状を作成
  var cubeGeometry = new THREE.BoxGeometry(7, 7, 7);
  // オブジェクトの材質（マテリアル：見え方）を設定（赤色）
  var cubeMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000});
  // 形状と材質を組み合わせてキューブのメッシュ（ポリゴンの集合）を作成
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0,0,0); // 立方体の座標（x,y,z）を設定
  cube.rotation.set(Math.PI/6, Math.PI/6, 0);
  scene.add(cube); // シーンに立方体を追加
  // 球体の追加
  // 半径，横の解像度，縦の解像度で形状を設定
  var sphereGeometry = new THREE.SphereGeometry( 5, 20, 20 );
  // オブジェクトの材質（マテリアル）を設定（赤色）
  // var sphereMaterial = new THREE.MeshToonMaterial({color: 0xFF0000});
  // 画像を読み込む
  var loader = new THREE.TextureLoader();
  var texture = loader.load('land_ocean_ice_cloud_2048.jpg');
  // マテリアルにテクスチャーを設定
  var sphereMaterial = new THREE.MeshStandardMaterial( {
    map: texture
  });

  // メッシュの作成
  var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphere.position.set(15,0,0); // 球体の座標（x,y,z）を設定
  scene.add(sphere); // シーンに球体を追加


  // 平面の追加
  // 縦,横の長さで形状を設定
  var BoxGeometry = new THREE.BoxGeometry(6, 6, 6);
  // オブジェクトの材質(マテリアル)を設定(灰色)
  var BoxMaterial1 = new THREE.MeshPhongMaterial({color: 0x000000});
  var BoxMaterial2 = new THREE.MeshPhongMaterial({color: 0xdc143c});

  // メッシュの作成
  for(var i = 0; i < 10; i++){
    var cnt = 0;
    for(var j = 0; j < 10;j++){
      if(i%2 == 0){
        if(j%2==0){
          var Box = new THREE.Mesh(BoxGeometry, BoxMaterial1);
        }else{
          var Box = new THREE.Mesh(BoxGeometry, BoxMaterial2);
        }
      }else{
        if(j%2==0){
          var Box = new THREE.Mesh(BoxGeometry, BoxMaterial2);
        }else{
          var Box = new THREE.Mesh(BoxGeometry, BoxMaterial1);
        }
      }

      Box.position.set((6*j)-30,-10,-(i*6)); // 平面の座標(x,y,z)を設定
      scene.add(Box); // シーンに平面を追加
      cnt++;
    }
  }


  // ４．光源（ライト）の設定と配置
  var light = new THREE.DirectionalLight( 0xFFFFFF ); // 光源の種類,色の設定
  light.position.set( 0, 30, 30 ); // 光源の位置（x,y,z）
  scene.add( light ); // シーンに光源を追加

  var axes = new THREE.AxisHelper(20); // 長さ20の軸を作成
  scene.add(axes); // 作った軸をシーンに追加

  // ライトヘルパーを作成
  var lightHelper = new THREE.SpotLightHelper(light);
  scene.add(lightHelper);

  // ５．レンダラーの設定
  var renderer = new THREE.WebGLRenderer();  // レンダラーの作成
  renderer.setClearColor(new THREE.Color(0x000000));  // 背景色の設定
  renderer.setSize(window.innerWidth, window.innerHeight); // サイズ設定
  // レンダラーのDOM要素をbodyタグ内の子要素として追加する
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera); // シーンのレンダリング
  // カメラコントロールの定義
  var trckblCtrls = new THREE.TrackballControls(camera, renderer.domElement);
  trckblCtrls.rotateSpeed = 1.0; // カメラを回転させる速さの設定
  trckblCtrls.zoomSpeed = 1.0; // カメラをズームさせる速さの設定
  trckblCtrls.panSpeed = 1.0; // カメラをパンさせる速さの設定
  var clock = new THREE.Clock(); // 経過時間を取得するためのオブジェクト
  clock.start(); // 時間の計測を開始
  var x = 0.1;
  function animate(){ // アニメーションを実行する関数(animate)
    // 立方体をy軸周りに1°(= π/180)だけ回転させる
    cube.rotation.y = cube.rotation.y + Math.PI/180;
    cube.position.x = cube.position.x + x;
    if(cube.position.x > 10 ||cube.position.x < -10 ){
      x *= -1;
    }
    // 前回getDelta()が呼ばれたときからの時間を取得
    var delta = clock.getDelta();
    trckblCtrls.update(delta); // 前回のupdateからのカメラの差分を更新
    renderer.render(scene, camera); // シーンのレンダリング
    requestAnimationFrame(animate); // animate関数を実行(2回目以降)
  }
  animate();
}
