<template>
  <div class="l-browse-page__hero--item">
    <a target="_blank" @click="open_win">
      <div
        class="l-browse-page__hero--title l-browse-page__hero--skill-iq"
        aria-label="skill iq"
      >
        <span class="l-browse-page__hero--skill-iq-image-with-text"></span>
        <div class="l-browse-page__hero--item-text">
          不要只是猜测你的技能在哪里 - 
          <br />证明它
        </div>
      </div>
      <div class="l-browse-page__hero--audience-bar">
        <div class="l-browse-page__hero--audience course-theme-color--skill-iq"></div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    //点击skillIQ跳转答题系统
    open_win() {
      this.$router.push({
        name: "exercisesPath",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .l-browse-page__hero--item {
    margin-left: 15px;
    margin-bottom: 15px;
    min-width: 260px;
    position: relative;
    height: 160px;
    flex: 1 0 21%;
    align-self: stretch;
    transition: all 300ms;
  }
  .l-browse-page__hero--skill-iq {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 15px 0;
  }
  .l-browse-page__hero--title {
    display: block;
    height: 100%;
    padding: 15px;
    background-color: #222;
  }
  .l-browse-page__hero--skill-iq span:first-of-type {
    width: 100px;
    height: 50px;
    display: block;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIxMDAiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMzIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDF7ZmlsbDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qye2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI5MC42OTI3IiB5MT0iMzcuMDU5MyIgeDI9IjQ1LjY4MzUiIHkyPSI3LjQxOTEiPgoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMTVCMkIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTcxMzg5Ii8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU4LjksMzAuOUw1OC45LDMwLjljLTEuNCwwLTIuNi0xLjItMi42LTIuNlYzLjljMC0xLjQsMS4yLTIuNiwyLjYtMi42aDBjMS40LDAsMi42LDEuMiwyLjYsMi42djI0LjUKCQlDNjEuNCwyOS44LDYwLjMsMzAuOSw1OC45LDMwLjl6Ii8+Cgk8Zz4KCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ijk3LjM4NjkiIHkxPSIyNi44OTM5IiB4Mj0iNTIuMzc3OCIgeTI9Ii0yLjc0NjIiPgoJCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRjE1QjJCIi8+CgkJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNzEzODkiLz4KCQk8L2xpbmVhckdyYWRpZW50PgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ny44LDI1LjhoLTYuM2MwLjQtMC40LDAuOS0wLjgsMS4zLTEuMmMwLjYtMC43LDEuMi0xLjUsMS42LTIuM2MwLjUtMC45LDAuOS0xLjksMS4yLTMKCQkJYzAuMy0xLjEsMC41LTIuMywwLjUtMy42YzAtMi4yLTAuNC00LjItMS4yLTYuMWMtMC44LTEuOC0xLjgtMy40LTMuMi00LjdjLTEuNC0xLjMtMy0yLjMtNC45LTMuMWMtMS45LTAuNy00LTEuMS02LjItMS4xCgkJCWMtMi4yLDAtNC4zLDAuNC02LjIsMS4xYy0xLjksMC43LTMuNiwxLjctNSwzLjFjLTEuNCwxLjMtMi41LDIuOS0zLjMsNC43Yy0wLjgsMS44LTEuMiwzLjgtMS4yLDYuMWMwLDIuNCwwLjQsNC41LDEuMSw2LjMKCQkJYzAuNywxLjksMS44LDMuNCwzLjEsNC43YzEuMSwxLjEsMi40LDEuOSwzLjksMi41YzEuMywwLjgsNC40LDEuNCw1LjMsMS40aDE5LjNjMS4yLDAsMi4yLTEsMi4yLTIuMlYyOAoJCQlDMTAwLDI2LjgsOTksMjUuOCw5Ny44LDI1Ljh6IE04MC40LDI2LjNjLTUuNywwLTEwLjItNC43LTEwLjItMTAuNmMwLTUuOSw0LjYtMTAuNiwxMC4yLTEwLjZjNS43LDAsMTAuMiw0LjcsMTAuMiwxMC42CgkJCUM5MC43LDIxLjUsODYuMSwyNi4zLDgwLjQsMjYuM3oiLz4KCTwvZz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wLDI4LjZsMC44LTEuMWMxLjYsMS4yLDMuNCwxLjksNS4zLDEuOWMyLDAsMy41LTEuMSwzLjUtMi44di0wLjFjMC0xLjctMS44LTIuNC0zLjktMi45Yy0yLjQtMC43LTUtMS40LTUtNAoJCQl2LTAuMWMwLTIuNCwyLTQuMSw0LjgtNC4xYzEuOCwwLDMuNywwLjYsNS4yLDEuNkwxMCwxOC4yYy0xLjQtMC45LTMtMS41LTQuNS0xLjVjLTIsMC0zLjMsMS4xLTMuMywyLjZ2MC4xYzAsMS42LDIsMi4yLDQuMSwyLjgKCQkJYzIuNCwwLjcsNC44LDEuNSw0LjgsNC4xdjAuMWMwLDIuNi0yLjIsNC4zLTUuMSw0LjNDMy45LDMwLjcsMS42LDI5LjgsMCwyOC42eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS42LDkuNEgxN3YxNS43bDkuMS05LjRoMS45bC02LjQsNi41bDYuNiw4LjJoLTEuOGwtNS44LTcuMkwxNywyNi44djMuNmgtMS40VjkuNHoiLz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzEuNywxMGgxLjh2MS45aC0xLjhWMTB6IE0zMS45LDE1LjdoMS40djE0LjdoLTEuNFYxNS43eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zOSw5LjRoMS40djIxSDM5VjkuNHoiLz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDYuMiw5LjRoMS40djIxaC0xLjRWOS40eiIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=");
    text-align: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
  }
  .l-browse-page__hero--item-text {
    text-align: center;
    color: #ccc;
    font-size: 12px;
    max-width: inherit;
    margin: 7px auto 0 auto;
  }
  .l-browse-page__hero--audience-bar {
    height: 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .l-browse-page__hero--item:hover {
    background-color: rgb(49, 49, 49);
    cursor: pointer;
  }
</style>