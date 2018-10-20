<template>
    <div id="app">
        <!-- BEGIN : DISPLAY AREA -->
        <section id="displayarea">
            <router-view/>
            <span 
                v-on:mousedown="resizeMouseDown"
                v-on:drag="resizeDrag"
                v-on:dragend="resizeDragEnd"
                draggable="true"
                class="resize"></span>
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
    },
    methods: {
        resizeMouseDown : function(evt)
        {
            evt.target.mouseDown = true;
        },
        resizeDrag : function(evt)
        {
            const maxResize = window.innerWidth - 600;

            if (evt.target.mouseDown &&
                evt.target.parentNode.offsetWidth <= maxResize) 
            {
                evt.target.parentNode.style.width = evt.pageX + 'px';
                evt.target.parentNode.style.flex = '0 0 auto';
                this.setMinResize(evt.target.parentNode);
                this.setMaxResize(evt.target.parentNode);
                this.setMobileView(evt.target.parentNode);
            }
        },
        resizeDragLeave : function(evt)
        {
            const maxResize = window.innerWidth - 600;

            if (evt.target.mouseDown &&
                evt.target.parentNode.offsetWidth <= maxResize) 
            {
                evt.target.mouseDown = false;
                this.setMinResize(evt.target.parentNode);
                this.setMaxResize(evt.target.parentNode);
                this.setMobileView(evt.target.parentNode);
            }
        },
        resizeDragEnd : function(evt)
        {
            const maxResize = window.innerWidth - 600;

            if (evt.target.mouseDown &&
                evt.target.parentNode.offsetWidth <= maxResize) 
            {
                evt.target.parentNode.style.width = evt.pageX + 'px';
                evt.target.mouseDown = false;
                this.setMinResize(evt.target.parentNode);
                this.setMaxResize(evt.target.parentNode);
                this.setMobileView(evt.target.parentNode);
            }
        },
        setMinResize : function(el)
        {
            const minResize = 350;

            if (el.offsetWidth < minResize)
            {
                el.style.width = minResize + 'px';
            }
        },
        setMaxResize : function(el)
        {
            const maxResize = window.innerWidth - 600;

            if (el.offsetWidth > maxResize)
            {
                el.style.width = maxResize + 'px';
            }
        },
        setMobileView : function(el)
        {
            if (el.offsetWidth < 650) 
            {
                el.classList.add('mobile');
            } 
            else if (el.offsetWidth >= 650)
            {
                el.classList.remove('mobile');
            }
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
    color: #2c3e50;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    overflow: hidden;
    box-sizing: border-box;

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
        transform: translateX(60%);
        z-index: 3;

        &:hover {
            cursor: col-resize;
        }
    }
}
</style>