(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{369:function(n,s,e){n.exports=e.p+"assets/img/jvm_6.51562dd6.jpg"},370:function(n,s,e){n.exports=e.p+"assets/img/jvm_7.9d256a7c.jpg"},475:function(n,s,e){"use strict";e.r(s);var a=e(25),l=Object(a.a)({},(function(){var n=this,s=n.$createElement,a=n._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("p",[n._v("本节的目标是做一些优化以满足对应用对延迟的需求。这次需要几个步骤，包括完善Java堆大小的配置，评估垃圾回收占用的时间和频率，也许还要尝试切换到不同的垃圾回收器，以及由于使用了不同的垃圾回收器，需要重新优化Java堆空间大小。")]),n._v(" "),a("p",[n._v("这一步有如下可能的结果：")]),n._v(" "),a("p",[n._v("1、应用的延迟需求被满足了。如果这一步的优化操作满足了应用的延迟需求，你可以继续下一步优化（优化吞吐量）。\n2、应用的延迟需求未被满足。如果这一步的优化操作未能满足延迟需求，你可能需要重新看看延迟需求是否合理或者修改应用程序。一些可能的问题可以帮助改善应用的延迟问题：\na、优化Java堆以及修改应用以减少对象的分配和对象的长时间存活。\nb、修改JVM的部署结构，让每一个JVM做更少的工作。")]),n._v(" "),a("p",[n._v("上面的两个步骤都可以减少JVM的对象分配，因此减少垃圾回收的频率。")]),n._v(" "),a("p",[n._v("这一步从查看垃圾回收对应用的延迟的影响开始，基于前面一节“决定内存消耗”计算出来的Java堆大小。")]),n._v(" "),a("p",[n._v("下面列出了评估垃圾回收对延迟的影响需要进行的几个事情：\n1、测量MinorGC的时间。\n2、测量MinorGC的频率。\n3、测量FullGC的时间。\n4、测量FullGC的频率。")]),n._v(" "),a("p",[n._v("测量垃圾回收的时间的和频率对于改善Java堆大小配置来说是非常重要的。MinorGC的时间和频率的测量结果可以用来改善young代的空间大小。测量最坏情况下FullGC的时间和频率可以用来决定old代的大小，以及是否需要切换成吞吐量垃圾回收器（通过使用-XX:+UseParalleOldGC或者-XX:+UseParallelGC）或者并发垃圾回收器（CMS，通过使用-XX:+UseConcMarkSweepGC）。在使用吞吐量垃圾回收器的时候，如果垃圾回收的延迟和频率太高以导致应用的延迟需求无法满足的时候才切换到CMS，如果选择了切换，需要对CMS垃圾回收器进行优化，后面会详细介绍这个问题。")]),n._v(" "),a("p",[n._v("接下来详细介绍前面提到的各种情况。\n需求\n下面列举了几个这一步优化操作需求，它们来源于应用的系统需求：\n1、可以接收的平均暂停时间。平均暂停时间需求用于和MinorGC消耗的时间比较。\n2、可以接收的MinorGC的频率。其实频道对于应用负责人来说，没有平均延迟时间重要。\n3、应用负责人能够接受的最大延迟时间。这个时间受到FullGC的影响。\n4、应用负责人能够接收的最大延迟的频率，即FullGC的频率。其实，大多数时间应用管理员还是更加关心应用的的最大延迟时间超过了最大延迟的频率。")]),n._v(" "),a("p",[n._v("一旦确定了需求，这些垃圾回收器的时间消耗和频率都可以通过垃圾回收日志收集到。先把垃圾回收器设置为吞吐量垃圾回收器（设置-XX:+UseParallelOldeGC或者-XX:+UseParallelGC）。通过反复测试，可以让young代和old代满足上面的要求。下面2节介绍如何优化young代和old代空间大小来观察MinorGC和最坏情况的FullGC的消耗时间和频率。")]),n._v(" "),a("p",[n._v("改善young代的大小\n确定young代的大小是通过评估垃圾回收的统计信息以及观察MinorGC的消耗时间和频率，下面举例说明如何通过垃圾回收的统计信息来确定young代的大小。")]),n._v(" "),a("p",[n._v("尽管MinorGC消耗的时间和young代里面的存活的对象数量有直接关系，但是一般情况下，更小young代空间，更短的MinorGC时间。如果不考虑MinorGC的时间消耗，减少young代的大小会导致MinorGC变得更加频繁，由于更小的空间，用玩空间会用更少的时间。同理，提高young代的大小会降低MinorGC的频率。")]),n._v(" "),a("p",[n._v("当测试垃圾回收数据的时候，发现MinorGC的时间太长了，正确的做法就是减少young代的空间大小。如果MinorGC太频繁了就增加young代的空间大小。")]),n._v(" "),a("p",[a("img",{attrs:{src:e(369),alt:"流程"}})]),n._v(" "),a("p",[n._v("上图是一个展示了MinorGC的例子，这个例子是运行在如下的HotSpot VM命令参数下的。")]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("-Xms6144m -Xmx6144m -Xmn2048m -XX:PermSize=96m -XX:MaxPermSize=96m -XX:+UserParallelOldGC  \n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("上图显示了MinorGC平均的消耗时间是0.05秒，平均的频率是2.147秒1次。当计算MinorGC的消耗时间和频率的时候，越多的数据参与计算，准确性会越高。并且应用要处于稳定运行状态下来收集MinorGC信息也是非常重要的。")]),n._v(" "),a("p",[n._v("下一步是比较MinorGC的平均时间和系统对延迟的要求，如果MinorGC的平均时间大于了系统的要求，减少young代的空间大小，然后继续测试，再收集数据以及重新评估。")]),n._v(" "),a("p",[n._v("如果MinorGC的频率大于了系统的要求，就增加young代的空间大小，然后继续测试，再收集以及重新评估。")]),n._v(" "),a("p",[n._v("也许需要数次重复才能够让系统达到延迟要求。当你改变young代的空间大小的时候，尽量保持old代的空间大小不要改变。")]),n._v(" "),a("p",[n._v("从上图的垃圾回收信息来看，如果应用的延迟要求是40毫秒的话，观察到的MinorGC的延迟是58毫秒，比系统的要求高出了不少。上面例子使用的命令选项是")]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("-Xms6144m -Xmx6144m -Xmn2048m -XX:PermSize=96m -XX:MaxPermSize=96m -XX:+UserParallelOldGC  \n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("意味着old代的空间大小是4096M，减小young代的空间大小的10%而且要保持old代的空间大小不变，可以使用如下选项。")]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("-Xms5940m -Xmx5940m -Xmn1844m -XX:PermSize=96 -XX:MaxPermSize=96 -XX:+UserParallelOldGC  \n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("注意的是young代的空间大小从2048M减少到1844M，整个Java堆的大小从6144M减少到5940M，两者都是减少了204m。")]),n._v(" "),a("p",[n._v("无论是young的空间调大还是调小，都需要重新收集垃圾回收信息和重新计算MinorGC的平均时间和频率，以达到应用的延迟要求，可能需要几个轮回来达到这个要求。")]),n._v(" "),a("p",[n._v("为了说明了增加young代的大小以降低MinorGC的频率，我们下面举一个例子。如果系统要求的频率是5秒一次，这个上面的例子中是2.147秒一次，也就是说它用了2.147秒，填充满了2048M空间，如果需要5秒一次的频率，那么就需要5/2.147倍的空间，即2048*5/2.147等于4700M。因此young代的空间需要调整到4700M。下面是一个示例来说明配置这个：")]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("-Xms8796m -Xmx8796m -Xmn4700m -XX:PermSize=96m -XX:MaxPermSize=96m -XX:+UsePrallelOldGC  \n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("注意是-Xms和-Xmx也同步调整了。")]),n._v(" "),a("p",[n._v("另外一些调整young代的空间需要注意的事项：\n1、old代的空间一定不能小于活动对象的大小的1.5倍。\n2、young代的空间至少要有Java堆大小的10%，太小的Java空间会导致过于频繁的MinorGC。\n3、当提高Java堆大小的时候，不要超过JVM可以使用的物理内存大小。如果使用过多的物理内存，会导致使用交换区，这个会严重影响性能。")]),n._v(" "),a("p",[n._v("如果在仅仅是MinorGC导致了延迟的情况下，你无法通过调整young代的空间来满足系统的需求，那么你需要重 新修改应用程序、修改JVM部署模型把应用部署到多个JVM上面（通常得要多机器了）或者重新评估系统的需求。")]),n._v(" "),a("p",[n._v("如果通过调整MinorGC能够满足应用的延迟需求，接下来就可以调整old代了，以达到最坏情况下的延迟和延迟频率的需求。下一节详细说明这个问题。")]),n._v(" "),a("p",[n._v("完善old代的大小\n这一节的目标是评估由于FullGC引起的最差暂停时间和频率。")]),n._v(" "),a("p",[n._v("同前面一个节“完善young代大小”一样，垃圾回收的统计信息是必须的，在稳定状态下，FullGC的时间表明了应用最差的延迟，如果发生了多个FullGC，计算多个FullGC的平均消耗时间，更多数据能够更好的评估。")]),n._v(" "),a("p",[n._v("计算两次不同的FullGC之间的时间差，可以提供出FullGC的频率，下图用一个列子来说明两个FullGC：")]),n._v(" "),a("p",[a("img",{attrs:{src:e(370),alt:"流程"}})]),n._v(" "),a("p",[n._v("如果没有FullGC，可以人为的去干预，前面说过，可以使用VisualVM来触发FullGC。另外，评估FullGC的频率需要知道对象的转移率，这个转移率说明对象从young代转移到old代。接下来的介绍如何评估转移率。")]),n._v(" "),a("p",[n._v("接下有个几个MinorGC的例子，他们被用来评估FullGC的频率。")]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("2010-12-05T14:40:29.564-0800: [GC  \n[PSYoungGen: 2045989K->249795K(2097152K)]  \n3634533K->1838430K(6291456K), 0.0543798 secs]  \n[Times: user=0.38 sys=0.01, real=0.05 secs]  \n\n2010-12-05T14:40:31.949-0800: [GC  \n[PSYoungGen: 2047896K->247788K(2097152K)]  \n3655319K->1859216K(6291456K), 0.0539614 secs]  \n[Times: user=0.35 sys=0.01, real=0.05 secs]  \n\n2010-12-05T14:40:34.346-0800 [GC  \n[PSYoungGen: 2045889K->248993K(2097152K)]  \n3677202K->1881099K(6291456K), 0.0532377 secs]  \n[Times: user=0.39 sys=0.01, real=0.05 secs]  \n\n2010-12-05T14:40:36.815-0800 [GC  \n[PSYoungGen: 2047094K->247765K(2097152K)]  \n3696985K->1900882K(6291456K), 0.0543332 secs]  \n[Times: user=0.37 sys=0.01, real=0.05 secs]  \n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br"),a("span",{staticClass:"line-number"},[n._v("5")]),a("br"),a("span",{staticClass:"line-number"},[n._v("6")]),a("br"),a("span",{staticClass:"line-number"},[n._v("7")]),a("br"),a("span",{staticClass:"line-number"},[n._v("8")]),a("br"),a("span",{staticClass:"line-number"},[n._v("9")]),a("br"),a("span",{staticClass:"line-number"},[n._v("10")]),a("br"),a("span",{staticClass:"line-number"},[n._v("11")]),a("br"),a("span",{staticClass:"line-number"},[n._v("12")]),a("br"),a("span",{staticClass:"line-number"},[n._v("13")]),a("br"),a("span",{staticClass:"line-number"},[n._v("14")]),a("br"),a("span",{staticClass:"line-number"},[n._v("15")]),a("br"),a("span",{staticClass:"line-number"},[n._v("16")]),a("br"),a("span",{staticClass:"line-number"},[n._v("17")]),a("br"),a("span",{staticClass:"line-number"},[n._v("18")]),a("br"),a("span",{staticClass:"line-number"},[n._v("19")]),a("br")])]),a("p",[n._v("从上面的例子可以看出：\n1、Java堆的大小是6291456K或6144M\n2、young代的大小是2097152K或2048M\n3、old代的大小是6144M-2048M = 4096M")]),n._v(" "),a("p",[n._v("在这个例子中，活动对象的大小差不多是1370M。那么old代还有2726M剩余空间（4096M-1370M=2726M）。")]),n._v(" "),a("p",[n._v("填充完成2736M空间需要多长时间是由young代向old代的转移率决定的。这个转移率的计算通过查看每次MinorGC后old代的占用空间的增长情况以及MinorGC发生的时间。old代的空间占用是MinorGC之后Java堆中对象大小减去young代的大小，通过这个公式计算，可以看出在这个例子中每次MinorGC之后，old代的空间占用情况是：")]),n._v(" "),a("p",[n._v("1588635K，第一个MinorGC\n1611428K，第二次MinorGC\n1632106K，第三次MinorGC\n1653117K，第四次MinorGC")]),n._v(" "),a("p",[n._v("每次的增量分别是\n22793K，第一次和第二次的增量\n20678K，第二次和第三次的增量\n21011K，第三次和第四次的增量")]),n._v(" "),a("p",[n._v("平均每次MinorGC转移大概201494K或者叫21M。")]),n._v(" "),a("p",[n._v("如果剩余的空间都是按照设个转移率来转移到old代的话，且知道MinorGC的频率是每2.147秒一次。因此，这个转移率是201494K/2.147s差不多10M/s,那么一共的空间是2736M空间需要273.6s差不多4.5分钟一次。")]),n._v(" "),a("p",[n._v("因此，通过前面的案例分析，应用的最差延迟的频率是4.5分钟。这个评估可以通过让应用处于稳定运行状态超过4.5分钟来验证。")]),n._v(" "),a("p",[n._v("如果评估和观察的FullGC的频率高于了应用对最坏延迟频率的要求，那么可以提高old代的空间大小。如果改变old代的大小，保持young代的空间恒定，在优化young代的时候也说这个问题，两者应该独立优化，以保证有高效。")]),n._v(" "),a("p",[n._v("如果这步已经达到了你最坏延迟的要求，那么这一步调优延迟就算已经完成了，就可以进入下一步去调优“吞吐量”了。")]),n._v(" "),a("p",[n._v("如果你未能达到了应用对最坏延迟时间和频率的性能要求，由于FullGC的执行时间太长了，然后你可以把垃圾回收器切换CMS（concurrent garbage collection）。CMS有能力让垃圾回收尽量是多线程的，即让程序保持在运行状态。要使用CMS可以通过下面这条命令选项:-XX:+UseConcMarkSweepGC。")]),n._v(" "),a("p",[n._v("后面详细说明如何调优CMS。")])])}),[],!1,null,null,null);s.default=l.exports}}]);