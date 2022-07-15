(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{414:function(a,s,n){a.exports=n.p+"assets/img/skywalking_conf.5f88e8f7.png"},505:function(a,s,n){"use strict";n.r(s);var t=n(25),e=Object(t.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"skywalking-服务端配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#skywalking-服务端配置"}},[a._v("#")]),a._v(" SkyWalking 服务端配置")]),a._v(" "),t("h2",{attrs:{id:"基于-docker-安装-elasticsearch"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基于-docker-安装-elasticsearch"}},[a._v("#")]),a._v(" 基于 Docker 安装 ElasticSearch")]),a._v(" "),t("h2",{attrs:{id:"docker-compose-yml"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose-yml"}},[a._v("#")]),a._v(" docker-compose.yml")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("version: '3.3'\nservices:\n  elasticsearch:\n    image: wutang/elasticsearch-shanghai-zone:6.3.2\n    container_name: elasticsearch\n    restart: always\n    ports:\n      - 9200:9200\n      - 9300:9300\n    environment:\n      cluster.name: elasticsearch\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br")])]),t("p",[a._v("其中，9200 端口号为 SkyWalking 配置 ElasticSearch 所需端口号，cluster.name 为 SkyWalking 配置 ElasticSearch 集群的名称")]),a._v(" "),t("h2",{attrs:{id:"下载并启动-skywalking"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#下载并启动-skywalking"}},[a._v("#")]),a._v(" 下载并启动 SkyWalking")]),a._v(" "),t("p",[a._v("官方已经为我们准备好了编译过的服务端版本，下载地址为 http://skywalking.apache.org/downloads/\n配置 SkyWalking\n下载完成后解压缩，进入 apache-skywalking-apm-incubating/config 目录并修改 application.yml 配置文件")]),a._v(" "),t("p",[t("img",{attrs:{src:n(414),alt:"idea配置"}})]),a._v(" "),t("p",[a._v("这里需要做三件事：")]),a._v(" "),t("ol",[t("li",[a._v("注释 H2 存储方案")]),a._v(" "),t("li",[a._v("启用 ElasticSearch 存储方案")]),a._v(" "),t("li",[a._v("修改 ElasticSearch 服务器地址")])]),a._v(" "),t("h2",{attrs:{id:"启动-skywalking"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动-skywalking"}},[a._v("#")]),a._v(" 启动 SkyWalking")]),a._v(" "),t("p",[a._v("修改完配置后，进入 apache-skywalking-apm-incubating\\bin 目录，运行 startup.bat 启动服务端\n默认的用户名密码为：admin/admin")])])}),[],!1,null,null,null);s.default=e.exports}}]);