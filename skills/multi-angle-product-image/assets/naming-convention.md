# 多角度产品图命名规范

> 适用范围：电商产品多角度图、白底图、场景图、细节图、包装图、A+素材、AI生成图、摄影交付文件
> 目标：保证文件名统一、可检索、可排序、可批量处理、可跨团队协作

## 一、命名目标

一个好的文件名应满足以下要求：

- 一眼识别产品
- 一眼识别角度
- 一眼识别用途
- 一眼识别版本
- 支持批量排序
- 适合设计、运营、摄影、后期、投放团队协作
- 避免中文乱码、空格问题和平台兼容问题

## 二、总命名结构

推荐基础结构：

    {brand}_{product}_{variant}_{angle}_{scene}_{usage}_{version}

如字段不需要，可按规则省略，但顺序尽量固定。

推荐最小结构：

    {product}_{angle}_{version}

推荐扩展结构：

    {brand}_{category}_{product}_{color}_{variant}_{angle}_{scene}_{usage}_{ratio}_{version}

## 三、字段定义

### 1. brand
品牌名或项目名。

规则：
- 使用小写英文或拼音
- 不使用空格
- 多词之间用短横线或下划线统一分隔
- 若为内部项目，也可用项目代号

示例：
- lumen
- softglow
- mkstudio

### 2. category
品类名，用于跨产品线管理。

示例：
- bag
- shoes
- bottle
- lamp
- organizer
- skincare

### 3. product
产品主名，必须稳定。

规则：
- 尽量简短
- 使用统一单数形式
- 不同部门必须共用同一写法
- 不要今天叫 travelbag，明天叫 dufflebag，后天叫 weekender

示例：
- totebag
- sneaker
- serum
- desklamp
- lunchbox

### 4. color
颜色字段，用于区分同款多色。

建议写法：
- black
- white
- beige
- pink
- navy
- silver
- transparent

多色时建议：
- black-gold
- white-blue

### 5. variant
规格、尺寸、材质、套装、版本差异。

示例：
- mini
- large
- pro
- 500ml
- leather
- 3pcs
- v1
- matte

说明：
- 如果产品差异明确且长期存在，建议放在 variant
- 如果只是修图版本差异，不要放这里，放 version

### 6. angle
多角度图最核心字段之一，必须标准化。

推荐角度缩写表：

- front：正面
- front45：前45度
- left：左侧
- right：右侧
- back：背面
- top：顶部
- bottom：底部
- detail01：细节1
- detail02：细节2
- macro01：微距1
- macro02：微距2
- open：打开状态
- closed：闭合状态
- flatlay：平铺
- hero：主视觉角度
- iso：等距陈列角度
- pack：包装图
- set：套装组合图
- inhand：手持图
- onbody：上身图
- lifestyle01：场景图1
- lifestyle02：场景图2

角度字段要求：
- 全团队统一，不随个人习惯变化
- 不建议混用 front45、45front、angle45
- 同一项目中 detail、macro 的编号方式必须统一

### 7. scene
背景或场景类型，用于区分白底、透明底、真实场景等。

推荐值：
- wb：白底
- bg：纯色背景
- tr：透明底
- studio：棚拍
- home：家居场景
- office：办公场景
- outdoor：户外
- shadow：带阴影版本
- noshadow：无阴影版本

### 8. usage
用途字段，用于区分平台或业务用途。

推荐值：
- main：主图
- gallery：组图
- detail：详情页
- ad：广告投放
- social：社媒
- aplus：A+页面
- pdp：商品详情页
- thumb：缩略图
- listing：列表页

### 9. ratio
画幅比例，可选字段。

推荐值：
- 1x1
- 4x5
- 3x4
- 9x16
- 16x9
- 2x3

适用场景：
- 同一图需要输出多个比例版本时
- AI生成、多平台分发、广告裁切时尤其有用

### 10. version
版本字段，必须保留。

推荐写法：
- v01
- v02
- v03

修图或最终状态可扩展：
- v01raw
- v02edit
- v03final
- v04final2

更推荐的稳定写法：
- v01
- v02
- v03

把最终状态交给文件夹管理或交付说明，而不是把文件名写得过长。

## 四、标准命名规则

### 1. 统一使用小写
推荐：
- product_front_wb_v01

不推荐：
- Product_Front_WB_V01
- PRODUCT_front_Final

### 2. 统一分隔符
推荐全项目只用一种：
- 下划线 _
或
- 短横线 -

更推荐：
- 下划线

示例：
- totebag_front_wb_v01

不推荐混用：
- totebag-front_wb-v01

### 3. 不使用空格
不推荐：
- tote bag front white bg v01

原因：
- 影响脚本处理
- 容易导致链接转义问题
- 云盘、网页、设计工具中兼容性较差

### 4. 不使用中文文件名
不推荐：
- 托特包_正面_白底_最终版

原因：
- 跨系统兼容性差
- 不利于自动化
- 不利于团队统一检索

### 5. 不使用模糊词
避免：
- new
- latest
- final
- finalfinal
- use-this
- ok
- test
- aaa

原因：
- 没有结构化信息
- 后期无法判断内容差异

### 6. 数字编号补零
推荐：
- detail01
- detail02
- detail03

不推荐：
- detail1
- detail2
- detail10

原因：
- 排序更稳定
- 批量处理更方便

## 五、推荐命名模板

### 模板 A：最简多角度版
适合单品基础交付

    {product}_{angle}_{version}

示例：
    bottle_front_v01
    bottle_back_v01
    bottle_left_v01
    bottle_right_v01

### 模板 B：标准电商版
适合电商商品图

    {product}_{angle}_{scene}_{usage}_{version}

示例：
    bottle_front_wb_main_v01
    bottle_front45_wb_gallery_v01
    bottle_back_wb_gallery_v01
    bottle_detail01_wb_detail_v01

### 模板 C：品牌管理版
适合多品牌、多SKU团队

    {brand}_{product}_{color}_{angle}_{scene}_{usage}_{version}

示例：
    lumen_bottle_black_front_wb_main_v01
    lumen_bottle_black_front45_wb_gallery_v01
    lumen_bottle_black_detail01_wb_detail_v01

### 模板 D：高级素材管理版
适合摄影、AI生成、广告投放并行场景

    {brand}_{category}_{product}_{color}_{variant}_{angle}_{scene}_{usage}_{ratio}_{version}

示例：
    lumen_drinkware_bottle_black_500ml_front_wb_main_1x1_v01
    lumen_drinkware_bottle_black_500ml_front45_wb_gallery_4x5_v01
    lumen_drinkware_bottle_black_500ml_lifestyle01_home_ad_9x16_v01

## 六、角度命名字典

以下字典建议固定使用：

### 基础角度
- front
- front45
- left
- right
- back
- top
- bottom

### 展示角度
- hero
- iso
- flatlay
- open
- closed
- folded
- expanded

### 细节角度
- detail01
- detail02
- detail03
- macro01
- macro02
- texture01
- logo01
- zipper01
- handle01
- port01
- button01

### 人物/使用状态
- inhand
- onbody
- inuse
- worn
- carry
- demo01

### 包装与组合
- pack
- packagefront
- packageopen
- set
- bundle
- accessories

说明：
- 如果品类固定，可建立更细的内部字典
- 但不要随项目临时发明命名，避免沉淀失败

## 七、用途字段建议

### 电商常用
- main
- gallery
- detail
- pdp
- aplus
- spec
- compare

### 广告与社媒
- ad
- social
- hook
- thumb
- cover
- story
- reel
- tiktok

### 内部工作流
- ref
- draft
- select
- retouch
- export

注意：
- 若面向外部正式交付，尽量减少内部流程词出现在最终文件名中
- 内部版本可保留，外发版本可另建导出副本

## 八、版本管理建议

### 1. 不要用“最终版”思维
不推荐：
- bag_front_final
- bag_front_final2
- bag_front_final_realfinal

推荐：
- bag_front_v01
- bag_front_v02
- bag_front_v03

### 2. 版本递增逻辑
适合以下变化时升级版本：
- 角度重做
- 背景重做
- 修图风格显著变化
- Logo修正
- 文案修正
- 材质重绘
- 输出比例重裁

### 3. 小改与大改
如果只是导出格式变化，不一定升级版本，可通过文件格式区分。
如果视觉内容变化，应升级版本。

## 九、文件夹与命名协同建议

推荐目录层级示例：

    /product-name/
      /raw/
      /select/
      /retouch/
      /export/
      /main/
      /detail/
      /lifestyle/

如果目录已经明确表达信息，文件名可以适当简化。
例如在 /main/ 文件夹内，可用：

    bottle_front_v01
    bottle_front45_v01

但如果文件会被拿出目录单独流转，仍建议保留完整信息。

## 十、常见错误示例

### 错误 1：信息缺失
    img001.jpg
    photo2.png
    final-ok.psd

问题：
- 看不出产品
- 看不出角度
- 看不出用途
- 无法批量管理

### 错误 2：命名风格混乱
    bag_front_v01
    Bag-Back-Final
    书包_侧面_新版
    bag45_ok

问题：
- 中英文混杂
- 分隔符混杂
- 版本规则混乱
- 无法自动排序

### 错误 3：角度词不统一
    front45
    45front
    angle45
    sideleft
    leftside

问题：
- 同义词过多
- 检索困难
- 容易误判为不同内容

### 错误 4：用途词不统一
    main
    hero
    primary
    firstimage

问题：
- 语义重叠
- 交接成本高
- 平台用途不清晰

## 十一、团队落地建议

### 1. 固定一份命名字典
至少统一以下字段：
- product
- color
- angle
- scene
- usage
- version

### 2. 在项目开始前确认
在拍摄、AI生成、修图、排版前，先锁定命名规则。
不要等导出后再补救。

### 3. 用表格维护SKU映射
建议维护一张表，记录：
- SKU
- 产品标准英文名
- 颜色标准词
- 尺寸标准词
- 角度输出要求
- 平台用途

### 4. 先命名后生产
无论是摄影还是AI生成，最好在任务下发时就确定目标文件名结构。
这样后期不容易混乱。

## 十二、推荐标准方案

### 轻量版
适合小团队或单品项目

    {product}_{angle}_{version}

示例：
    totebag_front_v01
    totebag_back_v01
    totebag_detail01_v01

### 标准版
适合大多数电商项目

    {product}_{angle}_{scene}_{usage}_{version}

示例：
    totebag_front_wb_main_v01
    totebag_front45_wb_gallery_v01
    totebag_inside_wb_detail_v01

说明：
如 inside 这类角度词要使用，需先纳入团队字典。

### 完整版
适合品牌化和自动化项目

    {brand}_{category}_{product}_{color}_{variant}_{angle}_{scene}_{usage}_{ratio}_{version}

示例：
    softglow_bag_totebag_black_large_front_wb_main_1x1_v01
    softglow_bag_totebag_black_large_front45_wb_gallery_4x5_v01
    softglow_bag_totebag_black_large_detail01_studio_detail_4x5_v01

## 十三、可公开复用的命名清单模板

项目名：
品牌名：
产品名标准词：
品类标准词：
颜色标准词：
规格标准词：
角度标准词：
- front
- front45
- left
- right
- back
- top
- bottom
- detail01
- detail02
- pack
- hero

场景标准词：
- wb
- bg
- studio
- home
- outdoor

用途标准词：
- main
- gallery
- detail
- ad
- social
- aplus

版本规则：
- v01
- v02
- v03

推荐命名结构：
    {brand}_{product}_{color}_{angle}_{scene}_{usage}_{version}

示例：
    brand_product_black_front_wb_main_v01
    brand_product_black_front45_wb_gallery_v01
    brand_product_black_detail01_wb_detail_v01

## 十四、最终结论

如果只保留一套最实用规则，推荐：

- 全部小写
- 使用下划线
- 不用中文
- 不用空格
- 角度字段标准化
- 版本统一为 v01、v02、v03
- 推荐结构：

    {product}_{angle}_{scene}_{usage}_{version}

这是电商多角度产品图最稳妥、最容易落地、最方便协作的一套公开可复用命名规范。
