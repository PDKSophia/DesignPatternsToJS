# 浏览器全屏

注意，进入全屏，需要注意，此时当我们**按下 `ESC` 退出键之后，直接就退出了**，因为我们调用的是浏览器的全屏，通过 `requestFullScreen` 进行全屏/非全屏的切换，而 `ESC` 是 `requestFullScreen` 自动封装的，这里问大家一个问题，“ 那我监听 keyCode = 27，在按下 esc 键之后，触发对应事件，行不行？”

神州行，我看行！一顿操作，哎呀，还真不行，前边说了啊，这个 `ESC` 是这个玩意自动封装了的，用 JS 方法监听无效，那怎么办 ？不慌，虽然我们知道，在使用 esc 离开全屏幕时不会触发按键事件。 但是，`fullscreenchange`事件是会被触发的。所以最终代码如何写呢？

## 使用

```js
import { fullScreen, cancelFullScreen, isFullScreen } from '@common/fullscreen';

function TuPu() {
  const domRef = useRef(null);
  function openFullScreen() {
    fullScreen(domRef.current); // 浏览器进入全屏
  }

  function closeFullScreen() {
    cancelFullScreen(); // 退出浏览器全屏
  }

  // 这才是重点 ❗❗❗
  // fullscreenchange 一定会被触发，监听这个，盘它!
  useEffect(() => {
    function exitHandler() {
      if (!isFullScreen()) {
        // 当前处于全屏下
        cancelFullScreen();
      }
    }
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
    return () => {
      document.removeEventListener('webkitfullscreenchange', exitHandler, false);
      document.removeEventListener('mozfullscreenchange', exitHandler, false);
      document.removeEventListener('fullscreenchange', exitHandler, false);
      document.removeEventListener('MSFullscreenChange', exitHandler, false);
    };
  });

  return (
    <div ref={domRef}>
      <EchartsCanvas />
    </div>
  );
}
```
