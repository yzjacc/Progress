<template>
    <div class="m-nav">
        <ul class="nav">
            <li class="list my">
                <router-link :to="{name: 'my'}" >我的美团</router-link>
                <dl>
                    <dd>
                        <router-link :to="{path: '/'}">我的订单</router-link>
                    </dd>
                    <dd>
                         <router-link :to="{path: '/'}">我的收藏</router-link>
                    </dd>
                    <dd>
                         <router-link :to="{path: '/'}">抵用券</router-link>
                    </dd>
                    <dd>
                         <router-link :to="{path: '/'}">账户设置</router-link>
                    </dd>
                </dl>
            </li>
            <li class="list">
                <router-link :to="{name: 'my'}">手机APP</router-link>
            </li>
            <li class="list bd">
                <router-link :to="{name: 'my'}">商家中心</router-link>
                <dl>
                    <dd>
                        <router-link :to="{path: '/'}">登录商家中心</router-link>
                    </dd>
                    <dd>
                         <router-link :to="{path: '/'}">美团智能收银</router-link>
                    </dd>
                    <dd>
                         <router-link :to="{path: '/'}">我想合作</router-link>
                    </dd>
                    <dd>
                         <router-link :to="{path: '/'}">账户设置</router-link>
                    </dd>
                </dl>
            </li>
            <li class="list site">
                <router-link :to="{name: 'my'}">网站导航</router-link>
                <div class="subContainer">
                    <dl class="hotel">
                        <dt>酒店旅游</dt>
                        <dd>
                            <router-link :to="{path: '/'}">我的订单</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">我的收藏</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">抵用券</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">账户设置</router-link>
                        </dd>
                    </dl>
                    <dl class="food">
                        <dt>吃美食</dt>
                        <dd>
                            <router-link :to="{path: '/'}">我的订单</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">我的收藏</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">抵用券</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">账户设置</router-link>
                        </dd>
                    </dl>
                    <dl class="movie">
                        <dt>看电影</dt>
                        <dd>
                            <router-link :to="{path: '/'}">我的订单</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">我的收藏</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">抵用券</router-link>
                        </dd>
                        <dd>
                            <router-link :to="{path: '/'}">账户设置</router-link>
                        </dd>
                    </dl>
                    <dl class="app">
                        <dt>手机应用</dt>
                        <dd>
                            <!-- <a href="#"> -->
                                <img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" title="美团app" alt="美团app">
                            <!-- </a> -->
                        </dd>
                    </dl>
                </div>
               
               
            </li>
        </ul>
    </div>
</template>
<script>
export default {

}
</script>

