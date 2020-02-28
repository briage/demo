namespace java com.maoyan.promotion.export.service.TActivityAdminRemoteService.thrift


struct TSaveActivityResponse {
  1:  bool success,
  2:  string message,
  3:  i64 activityId
}

struct TActivityRiskInfo {
  1:  i32 fingerPrintCheck, //是否需要指纹检测 0-否 1-是
  2:  i32 riskCheck, //是否需要风控 0-否 1-是
  3:  i32 riskCheckId //活动关联的风控活动id
}

struct TActivityShowInfo {
  1:  i32 showPriceType, //价格展示类型
  2:  i32 hidePreferential //0-默认，1-展示惠标
}

struct TActivityInfo {
  1:  i32 relationType //关联类型，与ActivityRelationConfig内的type保持一致
}

struct TSaveActivityBasicParam {
  1:  i64 id,
  2:  string name,
  3:  i32 templateId,
  4:  i32 categoryId,
  5:  i32 source,
  6:  i32 priority, //活动优先级, 一级10，二级20 三级30
  7:  i32 preInfoId,
  8:  i64 inventoryId,
  9:  i64 startTime,
  10:  i64 endTime,
  11:  TActivityRiskInfo riskInfo,
  12:  TActivityShowInfo showInfo,
  13:  TActivityInfo info,
  14:  string creator,
  15:  i32 onlineStatus
}

struct TSaveActivityRelationParam {
  1:  i32 relationType, //0-影院   3-影院组   2-活动会员卡
  2:  string relationIdListStr //relationType 对应的idList，json数组
}

struct TActivityConditionRelation {
  1:  i32 conditionId, //规则Id
  2:  string conditionValue //规则配置信息，格式需要约定
}

struct TSaveActivityConditionParam {
  1:  list<TActivityConditionRelation> conditionRelationList
}

struct TActivityActionGroupRelation {
  1:  i32 groupType, //活动配置类型, 1-简单型，2-阶梯型
  2:  string configValue //条件配置信息，需要前后端约定存储形式
}

struct TSaveActivityActionParam {
  1:  list<TActivityActionGroupRelation> actionGroupRelationList
}

struct TSaveActivityInventoryParam {
}

struct TSaveActivityOperatorParam {
  1:  string misId,
  2:  string name
}

struct TSaveActivityRequest {
  1:  TSaveActivityBasicParam basicParam,
  2:  TSaveActivityRelationParam relationParam,
  3:  TSaveActivityConditionParam conditionParam,
  4:  TSaveActivityActionParam actionParam,
  5:  TSaveActivityInventoryParam inventoryParam,
  6:  TSaveActivityOperatorParam operatorParam,
  7:  i32 saveSource //1-DAO层, 2-迁移, 3-admin
}

struct TDeleteActivityResponse {
  1:  bool success,
  2:  string message,
  3:  i32 rowCount
}

struct TDeleteActivityRequest {
  1:  list<i64> activityIdList
}

struct TActivityBasic {
  1:  i64 id, //活动Id
  2:  string name, //活动名称
  3:  i32 templateId, //活动模板Id
  4:  i32 categoryId, //活动标签
  5:  i32 source, //活动来源
  6:  i32 priority, //活动优先级, 一级10，二级20 三级30
  7:  i32 preInfoId, //活动文案Id
  8:  i64 inventoryId, //库存Id
  9:  i64 startTime, //活动开始时间
  10:  i64 endTime, //活动结束时间
  11:  TActivityRiskInfo riskInfo, //风控信息
  12:  TActivityShowInfo showInfo, //展示信息
  13:  TActivityInfo info, //额外信息
  14:  string creator, //创建人
  15:  i32 status, //状态
  16:  i32 onlineStatus //在线状态
}

struct TActivityRelationConfig {
  1:  i32 relationType, //关联类型，0-影院，1-影院组
  2:  string relationIdListStr //关联类型对应的影院组
}

struct TActivityView {
  1:  TActivityBasic activityBasic, //基本信息
  2:  TActivityRelationConfig activityRelation, //关联信息
  3:  list<TActivityConditionRelation> conditionRelationList, //condition信息
  4:  list<TActivityActionGroupRelation> actionGroupRelationList //action信息
}

struct TQueryActivityResponse {
  1:  bool success,
  2:  string message,
  3:  list<TActivityView> activityList
}

struct TQueryActivityRequest {
  1:  list<i64> activityIdList, //活动IdList
  2:  i32 templateId //活动模板Id
}

struct TQueryActivityIdsResponse {
  1:  bool success,
  2:  string message,
  3:  list<i64> activityIdList //活动IdList
}

struct TQueryGTEndTimeActivityIdRequest {
  1:  i64 endTime,
  2:  list<i64> activityIdList,
  3:  i32 offset,
  4:  i32 limit
}

struct TActivityTemplateIdPair {
  1:  i32 templateId, //活动模板Id
  2:  i64 activityId //活动Id
}

struct TQueryIdByDateResponse {
  1:  bool success,
  2:  string message,
  3:  list<TActivityTemplateIdPair> pairList
}

struct TQueryIdByDateRequest {
  1:  i64 lastStartTime,
  2:  i32 offset,
  3:  i32 limit
}

struct TQueryInventoryIdsResponse {
  1:  bool success,
  2:  string message,
  3:  list<i64> inventoryIdList
}

struct TQueryInventoryIdRequest {
  1:  list<i64> activityIdList,
  2:  string name
}

struct TQueryInventoryIdMapResponse {
  1:  bool success,
  2:  string message,
  3:  map<i64, i64> activityId2InventoryIdMap
}

struct TPage {
  1:  i32 offset,
  2:  i32 limit,
  3:  i32 total,
  4:  bool hasMore
}

struct TSearchActivityResponse {
  1:  bool success,
  2:  string message,
  3:  list<TActivityView> activityViewList,
  4:  TPage page
}

struct TSearchActivityRequest {
  1:  i64 activityId, //活动Id
  2:  list<i64> activityIdList, //活动IdList
  3:  string name, //活动名称，模糊查询
  4:  i32 source, //活动来源，同原阶梯
  5:  i32 templateId,
  6:  list<i32> templateIdList,
  7:  i32 status, //-1未指定，0未开始，1正在进行，2已结束
  8:  i32 priority, //活动优先级, 一级10，二级20 三级30
  9:  i32 preInfoId, //文案Id
  10:  i64 startTime,
  11:  i64 endTime,
  12:  string creator,
  13:  i32 offset,
  14:  i32 limit,
  15:  bool needRelation, //是否需要活动关联
  16:  i64 inventoryId,
  17:  list<i32> relationList
}

struct TAdminSearchByRelationRequest {
  1:  list<i32> templateIdList,
  2:  list<i32> relationList,
  3:  i32 offset,
  4:  i32 limit
}

struct TBizResult {
  1:  bool success,
  2:  string message
}

struct TUpdateInventoryIdRequest {
  1:  i64 inventoryId,
  2:  list<i64> activityId
}


service TActivityAdminRemoteService {
	
  TSaveActivityResponse createActivity(1: TSaveActivityRequest arg0),		        	
	
  TDeleteActivityResponse deleteActivitys(1: TDeleteActivityRequest arg0),		        	
	
  TQueryActivityResponse queryActivityByIdList(1: TQueryActivityRequest arg0),		        	
	
  TQueryActivityIdsResponse queryGTEndtimeActivityIdList(1: TQueryGTEndTimeActivityIdRequest arg0),		        	
	
  TQueryIdByDateResponse queryIdByDate(1: TQueryIdByDateRequest arg0),		        	
	
  TQueryInventoryIdsResponse queryInventoryIdByActivityName(1: TQueryInventoryIdRequest arg0),		        	
	
  TQueryInventoryIdMapResponse queryInventoryIds(1: TQueryInventoryIdRequest arg0),		        	
	
  TSearchActivityResponse searchActivity(1: TSearchActivityRequest arg0),		        	
	
  TSearchActivityResponse searchActivityByRelation(1: TAdminSearchByRelationRequest arg0),		        	
	
  TSaveActivityResponse updateActivity(1: TSaveActivityRequest arg0),		        	
	
  TBizResult updateInventoryId(1: TUpdateInventoryIdRequest arg0)		        	
}
