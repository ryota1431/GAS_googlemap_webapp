# `list.html` JavaScript 関数仕様書

## 1. 定数定義

```javascript
const maps = {};
const apiUrl = 'https://script.google.com/macros/s/AKfycbzQlHI563x1UTvCi645dFS8IciQ-iQJxpCj9ys6FW6R_x-juOz1MU0zlEaFDcYWtsY/exec';
```
maps: マップインスタンスを保存するオブジェクト。
apiUrl: センサーデータを取得するためのAPIのURL。
## 2. 初期化関数
### initMap
```JavaScript
function initMap() {
  const centerLocation = { lat: 37.900175106232396, lng: 140.1043221055276 };

  <? for (let i = 0; i < dataList.length; i++) { ?>
    <? output.append(dataList[i][0]); ?> = new google.maps.Map(document.getElementById('<?= dataList[i][0] ?>'), {
      zoom: 17,
      center: centerLocation,
      mapTypeId: 'terrain',
      styles: darkModeStyle,
    });
  <? } ?>

  <? for (let i = 0; i < dataList.length; i++) { ?>
    async function <? output.append('update' + dataList[i][0] + 'Data'); ?>() {
      const <? output.append(dataList[i][0] + 'Colors'); ?> = [
        <? for (let j = 0; j < dataList[i][2].length; j++){ ?>
          [ <?= dataList[i][2][j][0] ?> ,<?= dataList[i][2][j][1] ?> ],
        <? } ?>
      ];
      await updateMapData(apiUrl, <? output.append(dataList[i][0]); ?>, <? output.append(dataList[i][4]); ?>, '<?= dataList[i][0] ?>', <? output.append(dataList[i][0] + 'Colors'); ?>);
    }
    <? output.append('update' + dataList[i][0] + 'Data'); ?>();
    setInterval(<? output.append('update' + dataList[i][0] + 'Data'); ?>, 60000);
  <? } ?>
}
```
説明: Googleマップを初期化し、各データタイプに対してマップとデータ更新関数を定義する。
引数: なし
戻り値: なし
## 3. データ更新関数
### updateMapData
```JavaScript
async function updateMapData(apiUrl, map, markers, dataKey, colorList) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const latestDataByMac = {};

    data.forEach(item => {
      const macAddress = item["MAC Address"];
      const epochTime = item["Epoch Time"];

      if (!latestDataByMac[macAddress] || epochTime > latestDataByMac[macAddress]["Epoch Time"]) {
        latestDataByMac[macAddress] = item;
      }
    });

    Object.values(latestDataByMac).forEach(item => {
      const lat = item["Latitude"];
      const lng = item["Longitude"];
      const value = item[dataKey];

      addMarker({ lat, lng, value, dataKey }, map, markers, colorList);
    });
  } catch (error) {
    console.error("データ取得エラー:", error);
  }
}
```
説明: APIからセンサーデータを取得し、最新のデータをマップに表示する。
引数:
apiUrl: データを取得するAPIのURL
map: Googleマップインスタンス
markers: マーカーを格納する配列
dataKey: データの種類（例：Temperature, Pressure）
colorList: データ値に対応するカラーリスト
戻り値: なし
## 4. マーカー追加関数
### addMarker
```JavaScript
function addMarker({ lat, lng, value, dataKey }, map, markers, colorList) {
  const label = `${value}${dataKey === "Temperature" ? "℃" : dataKey === "Pressure" ? "hPa" : dataKey === "Illuminance" ? "lux" : "%"}`;

  for (var i = 0; i < colorList.length; i++){
    if (value > colorList[i][0]) {
      var color = colorList[i][1];
      break;
    }
  }
  if (value < colorList[colorList.length - 1][0]){
    var color = `rgb(0, 0, 0)`;
  }

  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    label: {
      text: label,
      color: color,
      fontSize: "24px",
    },
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.5,
        scale: 0,
        strokeColor: "white",
        strokeWeight: 0.5,
      },
  });
  markers.push(marker);
}
```
説明: マップにマーカーを追加する。
引数:
lat: 緯度
lng: 経度
value: センサーデータの値
dataKey: データの種類（例：Temperature, Pressure）
map: Googleマップインスタンス
markers: マーカーを格納する配列
colorList: データ値に対応するカラーリスト
戻り値: なし
