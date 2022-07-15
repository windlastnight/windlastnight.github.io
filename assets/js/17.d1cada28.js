(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{375:function(v,_,p){v.exports=p.p+"assets/img/jvm_1.295698af.jpg"},488:function(v,_,p){"use strict";p.r(_);var t=p(25),J=Object(t.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("p",[v._v("现代JVM是一个具有灵活适应各种应用能力的软件，尽管很多应用能够在JVM的默认配置下运行良好，但是有些应用还是需要优化JVM配置以达到其性能要求。由于各种各样的应用能够运行在现在JVM上面，所以大量的JVM选项可以配置来提升应用的性能。不幸的是，对一个应用而言优化得很好的JVM配置，对应另外的应用不一定适合。所以，真正理解怎样优化JVM配置是非常有必要的。")]),v._v(" "),t("p",[v._v("优化现代JVM是一门很大的艺术，但是理解和应用一些基本知识能够让优化JVM的任务变得更加简单。本章就是介绍这些基本知识和一些常规的步骤去优化Java HotSpot虚拟器。为了更好的理解本章的内容，你应该对JVM和垃圾回收器有一些基本的了解。")]),v._v(" "),t("p",[v._v("本章以一步步的优化方法包括一些假设开始，在优化JVM之前，你需要先知道怎样测试应用性能、性能需求、测试的基础工具以及用来收集数据的垃圾回收器的命令行选项。接下来有几个章节来说明怎么样一步步优HotSpot虚拟器行为——启动、内存的占用、吞吐量、延迟等。")]),v._v(" "),t("p",[t("strong",[v._v("方法")])]),v._v(" "),t("p",[v._v("下面这张图片展示了本章要说明的方法。他由一些清晰的应用性能需求开始，这个性能需求应该是应用负责人排过优先级的。与描述计算什么及输出什么的功能层面需求相比较，系统层面需求描述了系统的一些指标，比如：吞吐量、响应时间、内存消耗、启动时间、可用性以及易管理性等等。")]),v._v(" "),t("p",[t("img",{attrs:{src:p(375),alt:"流程"}})]),v._v(" "),t("p",[v._v("下一节，我们仔细看看每项系统指标对优化JVM的重要作用。")]),v._v(" "),t("p",[v._v("优化JVM性能涉及很多权衡，当你提升某一项性能指标的时候，往往需要牺牲其他指标。比如说，为了最少的消耗内存，往往需要以延迟或者响应时间作为代价。或者，你想要提升应用的易管理性，你需要降低应用的的可用性的级别，由于可用性的提升是建立在多个JVM上的，多个JVM可用降低一个JVM出错造成整个应用的无法使用的风险。由于有很多的取舍需要做，理解真正性能需求就变得极其重要了，理解需求才能够正确的使用方法。")]),v._v(" "),t("p",[v._v("一旦你知道了哪一些系统指标是重要的，接下来要做的就是选择JVM的部署模型，选择是部署在多JVM上面还是单个JVM上面。可用性、易管理性以及内存的占用等系统指标在选择合适的部署模型的时候都扮演了重要角色。")]),v._v(" "),t("p",[v._v("接下来就是选择JVM的Runtime，HotSpot虚拟器提供了聚焦在更快的启动速度和更小的内存占用的32位的client虚拟器，以及在32位和64位系统中有更高的吞吐量server虚拟器。系统对吞吐量、响应时间以及启动时间的需求决定了对JVM Runtime的选择。")]),v._v(" "),t("p",[v._v("接下来就是要优化垃圾回收器，以满足系统对内存占用、延迟以及吞吐量的需求，我们按照首先内存占用，其次延迟时间，最后吞吐量的顺序来进行优化。")]),v._v(" "),t("p",[v._v("优化是在不停地测试和调整配置中循环的，需要数次循环以达到性能的需求，另外，也有可能优化了一个点的时候，但是需要回到前面几个步骤重新进行检查。比如，假如你在几次优化垃圾回收器之后，对应用的延迟还是不满意，这个时候就有必要调整JVM的部署模型。另外一种可能是，应用程序有修改或者需要重新设定应用程序的性能需求。")]),v._v(" "),t("p",[v._v("对于一些应用以及它们的系统需求来说，需要循环几次这样的操作，直到应用责任人对应用的性能满意为止。")]),v._v(" "),t("p",[t("strong",[v._v("假设")])]),v._v(" "),t("p",[v._v("这个一步步的优化步骤，是基于应用都有以下执行过程的假设：")]),v._v(" "),t("p",[v._v("1、初始化阶段——初始化重要的数据结构和其他需要使用的依赖库。")]),v._v(" "),t("p",[v._v("2、稳定阶段——应用消耗大部分的时间执行其核心函数。")]),v._v(" "),t("p",[v._v("3、可选的总结阶段——比如需要制作报告。")]),v._v(" "),t("p",[v._v("稳定阶段是我们需要主要关注的地方。")]),v._v(" "),t("p",[t("strong",[v._v("测试基础设施：")])]),v._v(" "),t("p",[v._v("为了做出关于内存占用、延迟、吞吐量以及启动时间等优化有根据的决定，并且为了证实选择的JVM运行环境是正确的，我们需要从试验中收集数据（需要注意的是这个试验要能够反映生产环境的实际情况）。因此，有一个能够代表生产环境的性能测试环境就相当重要了。包括硬件和软件都需要代表生产环境。简单的说，测试环境和生产环境越接近，做出来的优化决定越靠谱。")]),v._v(" "),t("p",[v._v("下面，我们详细介绍需求的定义。")]),v._v(" "),t("p",[t("strong",[v._v("性能需求详细描述：")])]),v._v(" "),t("p",[v._v("从前面我们知道，系统层面的需求决定应用的某一方面的特性，比如它的吞吐量、响应时间、消耗的内存、它的可用性以及易管理性等等。另外，功能需求决定了应用计算的内容或者产生的输出。")]),v._v(" "),t("p",[v._v("接下来的我们描述一下我们会涉及到层面的需求。")]),v._v(" "),t("p",[t("strong",[v._v("可用性")])]),v._v(" "),t("p",[v._v("可用性是衡量应用处于可用状态的指标。可用性需求表明了当应用的某些组件损坏或者遇到错误的时候，整个应用或应用的其他部分处于可用状态。")]),v._v(" "),t("p",[v._v("在Java应用领域，高可用性可以通过把系统的分隔成各个组件，然后运行在不同JVM上面或者在多个JVM上面运行相同应用实例来实现。一个需要平衡的点是，当提升系统的可用性，系统的维护成本会升高。引入更多的JVM或者机器，那么就有更多的JVM需要管理，这个就是造成了成本的升高和复杂性的提升。")]),v._v(" "),t("p",[v._v("我们常见的可用性需求例子：“当系统某一部分出现错误的时候，不要让整个应用程序崩溃”。")]),v._v(" "),t("p",[t("strong",[v._v("易管理性")])]),v._v(" "),t("p",[v._v("易管理性是衡量系统的运行和监控的成本以及配置应用的成本。易管理性的需求表明了这个应用被管理的容易程度。通常来讲，用更少的JVM去运行应用，那么需要付出更小的成本去维护和监控应用。而且更少的JVM应用配置也更加简单，但是这个是建立牺牲应用的可用性上面的。")]),v._v(" "),t("p",[v._v("一个简单的易管理性需求例子：“由于有限的资源，应用只能部署到尽量少的JVM上面。”")]),v._v(" "),t("p",[t("strong",[v._v("吞吐量")])]),v._v(" "),t("p",[v._v("吞吐量是衡量系统在单位时间里面完成的工作数量。吞吐量需求通常忽略延迟或者响应时间。通常情况下，提升吞吐量需要以系统响应变慢和更多内存消耗作为代价。")]),v._v(" "),t("p",[v._v("一个吞吐量的例子：“这个应用需要每秒完成2500个事务。”")]),v._v(" "),t("p",[t("strong",[v._v("延迟和响应时间")])]),v._v(" "),t("p",[v._v("延迟或者响应时间是衡量应用从接收到一个任务到完成这个任务消耗的时间。一个延迟或者响应时间的需求需要忽略吞吐量。通常来讲，提升应用的响 应时间需要以更低吞吐量或提高应用的内容消耗。")]),v._v(" "),t("p",[v._v('一个延迟或者响应时间的例子:"这个应用会在60毫秒内，执行完成交易操作。"')]),v._v(" "),t("p",[t("strong",[v._v("内存占用")])]),v._v(" "),t("p",[v._v("内存占用是衡量应用消耗的内存，这个内存占用是指应用在运行在某一个吞吐量、延迟以及可用性和易管理性指标下的内存消耗，内存占用是通常描述为应用运行的时候Java堆的大小或者总共需要消耗内存。通常情况下，通过增加Java堆的大小以增加应用内存占用可以提升吞吐量或者减少延迟，或者两者兼具。当应用可用的内存减少的时候，吞吐量和延迟通常会受到损失。在给定内存的情况下，应用占用的内存可以限制应用的实例数（这个会影响可用性）。")]),v._v(" "),t("p",[v._v("一个例子说明内存占用的需求是：“这个应用会单独运行在一个8G的系统上面或者多出3个应用实例运行在一个24G的应用系统上面。”")]),v._v(" "),t("p",[t("strong",[v._v("启动时间")])]),v._v(" "),t("p",[v._v("启动时间是衡量应用初始化的时间（如：eclipse的启动时间）。在Java应用中，大家可能对JVM优化应用的热点需要的时间感兴趣。Java应用初始化需要消耗的时间依赖于很多因素包括单不仅限于需要装载的类的数量、需要初始化的对象数量、并且这些对象怎么初始化，以及HotSpot虚拟器运行环境的选择（client or server，eclipse使用的HotSpot Client，Jboss会使用HotSpot Server,两者在初始化时间上和运行过程中对热点的优化不一样）。")]),v._v(" "),t("p",[v._v("抛开需要加载的类的数量、需要初始化的对象的数量以及对象如何初始化，使用HotSpot client运行环境会获得更快的启动速度，由于他没有做足够的优化，这些优化可以提供更高吞吐量和更低的延迟。相反，HotSpot Server运行环境需要更长的启动时间，由于它需要更好多的获得应用关于Java代码的信息，并且对生成的机器码进行了很高优化。")]),v._v(" "),t("p",[v._v("启动时间需求的例子如：“这个应用会再15秒内完成初始化。”")]),v._v(" "),t("p",[t("strong",[v._v("对系统需求进行优先级排序")])]),v._v(" "),t("p",[v._v("优化操作的第一步就是对系统层面的需求进行优先级排序。做这个需要把主要的应用负责人叫到一起来商定优先级的排序，并且最终达成一致。这个讨论需要在应用的架构和设计阶段完成，由于这个讨论可以提供非常明确的结论，比如说：什么系统需求是最重要的。")]),v._v(" "),t("p",[v._v("对于应用的负责人来说，系统需求的优先级决定了优化操作。最重要的系统需求促使形成一些基本决定。比如说：可用性比易管理性重要，那么JVM部署模型就会采用部署多个JVM。相反如果易管理性比可用性重要，那么就更加倾向于选择单个JVM的部署模型。")]),v._v(" "),t("p",[v._v("如何选择JVM部署模型和JVM Runtime会在接下来的一节中讲到。")])])}),[],!1,null,null,null);_.default=J.exports}}]);