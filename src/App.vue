<template>
    <div id="app">
        <!-- BEGIN : DISPLAY AREA -->
        <section id="displayarea">
            <router-view/>
            <span class="resize"></span>
        </section>
        <!-- END : DISPLAY AREA -->
        <!-- BEGIN : WORK SPACE -->
        <workspace></workspace>
        <!-- END : WORK SPACE -->
    </div>
</template>

<script>
import workspace from './components/workspace/work-space.vue'

export default {
    name: 'App',
    components : {
        workspace
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss">
body
{
    background: rgba(230,230,230,1);
    height: 100vh;
    display: flex;
    flex-flow: column;
    margin: 0;

    & > * {
        flex: 1 1 auto;
    }
}

#app
{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    overflow: hidden;

    & > * {
        flex: 1 1 50%;
    }

    .initial-display
    {
        &:before {
            content: 'Drag Blocks Here To Start';
            color: rgba(120, 120, 120, 1);
            font-size: 2em;
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .resize {
        content: '';
        height: 100%;
        width: 15px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(50%);
        z-index: 2;

        &:hover {
            cursor: col-resize;
        }
    }
}
</style>