<!-- 播放组件 -->
<template>
    <div class="playerBox">
        <div class="musicImg">
            <img :class="{ move: true, isPaly: isPlay }" src="../../img/music.jpeg">
        </div>
        <div class="nameAndOp">
            <div class="name">
                <div class="songName">{{ currentSong.songName }}</div>
                <div class="singerName">-{{ currentSong.singerName }}</div>
            </div>
            <div class="op">
                <HeartOutlined title="我的喜欢" />
                <vertical-align-bottom-outlined title="下载" />
                <plus-outlined title="加入歌单" />
            </div>
        </div>
        <div class="playAndStop">
            <vertical-right-outlined />
            <play-circle-outlined v-show="!isPlay" class="play" @click="play" />
            <pause-circle-outlined v-show="isPlay" class="play" @click="pause" />
            <vertical-left-outlined />
        </div>
        <audio ref="audio" :src="currentSong.url" autoplay></audio>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { HeartOutlined, VerticalAlignBottomOutlined, PlusOutlined, VerticalRightOutlined, PlayCircleOutlined, VerticalLeftOutlined, PauseCircleOutlined } from '@ant-design/icons-vue';
import type { primitiveTypes } from '@/views/interface/public' // 常用TS接口引入
import { getDownloadUrl } from '@/utils/sdk'
import EventBus from '@/api/eventBus'

export default defineComponent({
    components: {
        HeartOutlined,
        VerticalAlignBottomOutlined,
        PlusOutlined,
        VerticalRightOutlined, PlayCircleOutlined, VerticalLeftOutlined, PauseCircleOutlined
    },
    name: 'searchDetails',
    setup(props, ctx) {
        const audio = ref<HTMLAudioElement | null>(null);
            EventBus.on('playMusic',(data)=>{
                currentSong.key = data.keyValue
                currentSong.songName = data.songName
                currentSong.singerName = data.singerName
                play()
            })
        const currentSong = reactive<primitiveTypes>({
            songName: '',
            singerName: '',
            url: '',
            key: ''
        });
        let isPlay = ref<boolean>(false) // 是否是播放状态
        const play = async () => {
            let url = await getDownloadUrl(currentSong.key)
            currentSong.url = url + ''
            if (audio.value) {
                audio.value.play();
                isPlay.value = true
            }
        };

        const pause = () => {
            if (audio.value) {
                audio.value.pause();
                isPlay.value = false
            }
        };
        return {
            audio, isPlay, play, pause, currentSong
        };
    }
})
</script>

<style lang='less' scoped>
.playerBox {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: #fff;
    z-index: 9999;
    padding: 12px;
    display: flex;
    justify-content: left;

    .musicImg {
        width: 76px;
        height: 76px;
        overflow: hidden;

        img {
            width: 76px;
            height: 76px;

        }

        .move {
            -webkit-animation: move 5s linear infinite;
            -moz-animation: move 5s linear infinite;
            -ms-animation: move 5s linear infinite;
            -o-animation: move 5s linear infinite;
            animation: move 5s linear infinite;
            animation-play-state: paused; // 暂停动画
        }

        .isPaly {
            animation-play-state: running; // 播放动画

        }

        @keyframes move {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    }

    .nameAndOp {
        margin-left: 20px;
        width: 300px;

        .name {
            display: flex;
            justify-content: left;
            line-height: 36px;

            .songName {
                color: #3B475D;
                font-size: 16px;
            }

            .singerName {
                color: #97A3BB;
                font-size: 12px;
                margin-left: 4px;
            }
        }

        .op {
            line-height: 40px;

            * {
                margin-right: 8px;
                cursor: pointer;
            }
        }
    }

    .playAndStop {
        display: flex;
        justify-content: center;
        width: 50vw;
        align-items: center;
        font-size: 30px;

        .play {
            color: #1DA57A;
            margin: 0 12px;
            font-size: 40px;

        }

        * {
            cursor: pointer;
        }
    }
}
</style>
