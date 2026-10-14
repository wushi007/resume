/**
 * 简历数据源。
 *
 * 内容逐字取自用户的 LaTeX 简历原文，未改写、未补数字、未拔高技术等级。
 * 组件只消费这里的数据，不内联任何简历文案。
 */

export type SkillLevel = '熟练' | '熟悉' | '了解'

export type SkillGroup = {
  level: SkillLevel
  items: string[]
}

export type ProjectBullet = {
  /** 粗体小标题，如「数仓架构」。渲染时补全角冒号 */
  label: string
  text: string
}

export type Project = {
  name: string
  /** LaTeX 原文中该项目未给出技术栈行；缺省时整行不渲染 */
  stack?: string[]
  bullets: ProjectBullet[]
}

/**
 * 页面是公开部署的，**不放电话和邮箱** —— 具体联系方式在投递简历时另行提供。
 * 姓名与求职方向保留，否则简历失去基本辨识度。
 */
export const profile = {
  name: '卢世涛',
  target: '数据开发实习生',
} as const

/** 到岗情况，置于页首个人信息区 */
export const availability = '可立即到岗，每周 5 天，3 个月以上'

export const navItems = [
  { id: 'summary', label: '个人简介' },
  { id: 'education', label: '教育经历' },
  { id: 'skills', label: '专业技能' },
  { id: 'projects', label: '项目经历' },
] as const

export const summary = [
  '基于 Spark 独立完成 ODS→DWD→DWS→ADS，了解 Spark 性能调优（AQE / 小文件治理 / 数据倾斜）与 StarRocks OLAP。了解 Flink CDC 及 Flink SQL，有实时链路相关知识。使用过 DataWorks 等阿里云相关组件。',
]

export const education = {
  school: '江西财经大学',
  major: '数据科学与大数据技术',
  degree: '本科在读',
  period: '2025.09 — 2029.06',
  certificates: ['大学英语四级（CET-4）', '计算机二级'],
  courses: [
    '数据结构',
    'Linux 操作系统',
    '数据库原理',
    'Python 程序设计',
    '大数据技术基础',
    '计算机网络',
  ],
}

export const skills: SkillGroup[] = [
  {
    level: '熟练',
    items: ['SQL（Spark SQL / Hive SQL）', 'Python', 'Spark', 'MySQL', 'Hive'],
  },
  {
    level: '熟悉',
    items: ['StarRocks（OLAP）', 'Airflow', 'HDFS', 'Git', 'Linux'],
  },
  {
    level: '了解',
    items: ['Flink（CDC / Flink SQL）', 'Pandas', 'Power BI'],
  },
]

export const projects: Project[] = [
  {
    name: '电商离线数仓',
    stack: [
      'Spark',
      'Hive',
      'SQL',
      'PySpark',
      'Airflow',
      'HDFS',
      'StarRocks',
      'Linux',
    ],
    bullets: [
      {
        label: '数仓架构',
        text: '基于 Spark + Hive 搭建 ODS→DWD→DWS→DIM→ADS 五层离线数仓，处理 1.098 亿行电商行为数据，产出 20+ 张分层表，使用 Airflow 实现 T+1 调度。',
      },
      {
        label: '维度建模',
        text: '设计用户、商品、地区、时间等维度及事实表；对商品数据去噪后，针对属性变化实现 SCD2，产出 23.0 万个商品版本，保证历史版本区间无重叠、无间隙。',
      },
      {
        label: '工程规范',
        text: 'INSERT OVERWRITE 动态分区增量覆写，保证幂等可重跑，统一数据口径及去重规则，处理跨月数据关联与增量更新。',
      },
      {
        label: '数据质量',
        text: '设计 ODS/DWD 双层 DQC，对分区完整性、行数波动、字段空值及数据一致性进行校验；通过跨引擎对账定位并修复留存指标重跑导致的结果异常。',
      },
      {
        label: '告警机制',
        text: '告警模块接入 Airflow 失败/重试回调（DAG 零改动），事件分级推送、重试只落台账；飞书卡片支持加签与失败降级纯文本，告警自带重跑命令。',
      },
      {
        label: '性能优化',
        text: '针对 Spark 数据倾斜问题，通过 Event Log 分析 Task 执行情况定位热点 Key，结合 AQE、定向加盐等方案进行优化。',
      },
    ],
  },
  {
    // LaTeX 原文中此项目没有「技术栈」行。下面两项由用户指定，
    // 且每一项都能在本项目的描述原文里找到出处：
    //   StarRocks —— 「基于 StarRocks 搭建电商 OLAP 分析平台」
    //   Spark     —— 「设计 Spark 与 StarRocks 对照 Benchmark」
    name: '电商 OLAP 分析与数据服务平台',
    stack: ['StarRocks', 'Spark'],
    bullets: [
      {
        label: '数据服务',
        text: '基于 StarRocks 搭建电商 OLAP 分析平台，导入 1.098 亿行 DWD 明细数据，构建用户、商品、交易等主题模型，支撑多维分析查询。',
      },
      {
        label: '数据接入',
        text: '通过 Parquet 数据文件完成离线数仓与 StarRocks 的数据衔接，将 DWD 明细数据导入 OLAP 引擎，实现离线计算与分析查询解耦。',
      },
      {
        label: '模型设计',
        text: '针对明细查询与聚合分析场景设计 Duplicate Key、Aggregate Key 等表模型，结合分区与排序键优化数据组织及查询性能。',
      },
      {
        label: 'Bitmap 优化',
        text: '针对 UV 去重场景使用 Bitmap 聚合存储用户集合，将 1.1 亿行明细聚合为 61 条数据（61 天），COUNT(DISTINCT) 查询由 730ms 降至 70ms，性能提升 11 倍。',
      },
      {
        label: '性能优化',
        text: '设计 Spark 与 StarRocks 对照 Benchmark，在统一数据与查询条件下对比执行耗时、扫描及聚合开销，9 类查询整体获得 3.3~11 倍性能提升。',
      },
    ],
  },
  {
    name: '基于 Flink CDC 的实时数仓',
    stack: [
      'Flink',
      'Flink CDC',
      'Kafka',
      'StarRocks',
      'MySQL',
      'Docker Compose',
      'Shell',
    ],
    bullets: [
      {
        label: '实时数仓建模',
        text: '独立搭建 MySQL → Flink CDC → Kafka → Flink SQL → StarRocks 实时数据链路，完成 ODS、DWD、DWS、ADS 分层，开发明细清洗、用户交易及日交易指标汇总，并通过 StarRocks 视图提供 ADS 指标查询。',
      },
      {
        label: '数据一致性',
        text: '实践 StarRocks Sink 两阶段提交与 Kafka 事务写入机制，探索端到端一致性保障；通过运行标识占位符替换，解决作业重启后的事务标识冲突问题。',
      },
      {
        label: '问题排查',
        text: '针对 Kafka 消费位点、事务超时及 StarRocks 更新流重复累加等问题进行排查，通过调整消费配置、事务参数与目标表模型，解决数据回放及指标重复计算问题。',
      },
      {
        label: '工程化与资源治理',
        text: '使用 Docker Compose 编排 MySQL、Kafka 与 StarRocks，通过合并多 Sink 作业及 ADS 视图化减少 Flink 作业数量，将作业数控制在 3 个，适配约 480MB 内存的实验环境。',
      },
    ],
  },
  {
    name: '基于 DataWorks 的云上数据开发实践',
    stack: ['DataWorks', 'OSS', 'PySpark', 'Parquet', 'Iceberg'],
    bullets: [
      {
        label: '云上数据接入',
        text: '使用 ossutil 将离线数仓源数据上传至 OSS，通过 PySpark 读取并转换为 Parquet 格式，完成部分数仓表的云上迁移与处理。',
      },
      {
        label: '数据湖开发',
        text: '基于 Iceberg 表开展数据清洗与转换，复刻部分离线数仓处理流程，完成 ADS 层结果表开发。',
      },
      {
        label: '任务调度',
        text: '在 DataWorks 中配置任务参数、上下游节点依赖及周期调度，实践补数据与失败重跑，了解云上数据开发任务的调度与运维流程。',
      },
    ],
  },
]
