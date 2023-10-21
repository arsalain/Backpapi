import mongoose from "mongoose";
const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    state: {
      type: String
    },
    daynight: {
      type: String
    },
    day: {
      type: String
    },
    testimage:
    {
      type: String
    },
    testimagealt: {
      type: String
    },
    person: {
      type: String
    },
    amount: {
      type: Number
    },
    filtertype: {
        type: String
      },
    covername: {
        type: String
      },
    coverimage: {
      type: String
    },
    coverimagealt: {
      type: String
    },
    coverdaynight: {
      type: String
    },
    coverdifficulty: {
      type: String
    },
    coverpara: {
      type: String
    },
    iternaryday0title: {
      type: String
    },
    iternaryday0pointH1: {
      type: String
    },
    iternaryday0point1: {
      type: String
    },
    iternaryday0point2: {
      type: String
    },
    iternaryday0point3: {
      type: String
    },
    iternaryday0point4: {
      type: String
    },
    iternaryday0point5: {
      type: String
    },
    iternaryday0pickup1: {
      type: String
    },
    iternaryday0pickup2: {
      type: String
    },
    iternaryday0pickup3: {
      type: String
    },
    iternaryday0pickup4: {
      type: String
    },
    iternaryday0pickup5: {
      type: String
    },
    iternaryday1title: {
      type: String
    },
    iternaryday1pointH1: {
      type: String
    },
    iternaryday1pointH2: {
      type: String
    },
    iternaryday1pointH3: {
      type: String
    },
    iternaryday1pointH4: {
      type: String
    },
    iternaryday1pointH5: {
      type: String
    },
    iternaryday1point1: {
      type: String
    },
    iternaryday1point2: {
      type: String
    },
    iternaryday1point3: {
      type: String
    },
    iternaryday1point4: {
      type: String
    },
    iternaryday1point5: {
      type: String
    },
    iternaryday1point6: {
      type: String
    },
    iternaryday1point7: {
      type: String
    },
    iternaryday1point8: {
      type: String
    },
    iternaryday1point9: {
      type: String
    },
    iternaryday1point10: {
      type: String
    },
    iternaryday2title: {
      type: String
    },
    iternaryday2pointH1: {
      type: String
    },
    iternaryday2pointH2: {
      type: String
    },
    iternaryday2pointH3: {
      type: String
    },
    iternaryday2point1: {
      type: String
    },
    iternaryday2point2: {
      type: String
    },
    iternaryday2point3: {
      type: String
    },
    iternaryday2point4: {
      type: String
    },
    iternaryday2point5: {
      type: String
    },
    iternaryday2point6: {
      type: String
    },
    iternaryday2point7: {
      type: String
    },
    iternaryday2point8: {
      type: String
    },
    iternaryday3title: {
      type: String
    },
    iternaryday3pointH1: {
      type: String
    },
    iternaryday3pointH2: {
      type: String
    },
    iternaryday3pointH3: {
      type: String
    },
    iternaryday3point1: {
      type: String
    },
    iternaryday3point2: {
      type: String
    },
    iternaryday3point3: {
      type: String
    },
    iternaryday3point4: {
      type: String
    },
    iternaryday3point5: {
      type: String
    },
    iternaryday3point6: {
      type: String
    },
    iternaryday3point7: {
      type: String
    },
    iternaryday3point8: {
      type: String
    },
    iternaryday4title: {
      type: String
    },
    iternaryday4pointH1: {
      type: String
    },
    iternaryday4pointH2: {
      type: String
    },
    iternaryday4pointH3: {
      type: String
    },
    iternaryday4point1: {
      type: String
    },
    iternaryday4point2: {
      type: String
    },
    iternaryday4point3: {
      type: String
    },
    iternaryday4point4: {
      type: String
    },
    iternaryday4point5: {
      type: String
    },
    iternaryday4point6: {
      type: String
    },
    iternaryday4point7: {
      type: String
    },
    iternaryday4point8: {
      type: String
    },
    inclusionspoint1: {
      type: String
    },
    inclusionspoint2: {
      type: String
    },
    inclusionspoint3: {
      type: String
    },
    inclusionspoint4: {
      type: String
    },
    inclusionspoint5: {
      type: String
    },
    inclusionspoint6: {
      type: String
    },
    inclusionspoint7: {
      type: String
    },
    inclusionspoint8: {
      type: String
    },
    inclusionspoint9: {
      type: String
    },
    exclusionspoint1:{
      type: String
    },
    exclusionspoint2:{
      type: String
    },
    exclusionspoint3:{
      type: String
    },
    exclusionspoint4:{
      type: String
    },
    exclusionspoint5:{
      type: String
    },
    exclusionspoint6:{
      type: String
    },
    thingspoint1:{
      type: String
    },
    thingspoint2:{
      type: String
    },
    thingspoint3:{
      type: String
    },
    thingspoint4:{
      type: String
    },
    thingspoint5:{
      type: String
    },
    thingspoint6:{
      type: String
    },
    thingspoint7:{
      type: String
    },
    thingspoint8:{
      type: String
    },
    thingspoint9:{
      type: String
    },
    thingspoint10:{
      type: String
    },
    thingspoint11:{
      type: String
    },
    thingspoint12:{
      type: String
    },
    thingspoint13:{
      type: String
    },
    thingspoint14:{
      type: String
    },
    thingspoint15:{
      type: String
    },
    thingspoint16:{
      type: String
    },
    thingspoint17:{
      type: String
    },
    thingspoint18:{
      type: String
    },
    thingspoint19:{
      type: String
    },
    thingspoint20:{
      type: String
    },
    policypoint1:{
      type: String
    },
    policypoint2:{
      type: String
    },
    policypoint3:{
      type: String
    },
    policypoint4:{
      type: String
    },
    policypoint5:{
      type: String
    },
    frequentlyquestion1: {
      type: String
    },
    frequentlyquestion2: {
      type: String
    },
    frequentlyquestion3: {
      type: String
    },
    frequentlyquestion4: {
      type: String
    },
    frequentlyquestion5: {
      type: String
    },
    frequentlyanswer1: {
      type: String
    },
    frequentlyanswer2: {
      type: String
    },
    frequentlyanswer3: {
      type: String
    },
    frequentlyanswer4: {
      type: String
    },
    frequentlyanswser5: {
      type: String
    },
    detailday0title: {
      type: String
    },
    detailday0point1: {
      type: String
    },
    detailday0point2: {
      type: String
    },
    detailday0point3: {
      type: String
    },
    detailday0point4: {
      type: String
    },
    detailday0point5: {
      type: String
    },
    detailday0point6: {
      type: String
    },
    detailday1title: {
      type: String
    },
    detailday1point1: {
      type: String
    },
    detailday1point2: {
      type: String
    },
    detailday1point3: {
      type: String
    },
    detailday1point4: {
      type: String
    },
    detailday1point5: {
      type: String
    },
    detailday1point6: {
      type: String
    },
    detailday2title: {
      type: String
    },
    detailday2point1: {
      type: String
    },
    detailday2point2: {
      type: String
    },
    detailday2point3: {
      type: String
    },
    detailday2point4: {
      type: String
    },
    detailday2point5: {
      type: String
    },
    detailday2point6: {
      type: String
    },
    detailday3title: {
      type: String
    },
    detailday3point1: {
      type: String
    },
    detailday3point2: {
      type: String
    },
    detailday3point3: {
      type: String
    },
    detailday3point4: {
      type: String
    },
    detailday3point5: {
      type: String
    },
    detailday3point6: {
      type: String
    },
    detailday4title: {
      type: String
    },
    detailday4point1: {
      type: String
    },
    detailday4point2: {
      type: String
    },
    detailday4point3: {
      type: String
    },
    detailday4point4: {
      type: String
    },
    detailday4point5: {
      type: String
    },
    detailday4point6: {
      type: String
    },
    plantitlehead:  {
      type: String
    },
    planid1: {
      type: Number
    },
    planimg1:{
      type: String
    },
    planimg1alt:{
      type: String
    },
    planname1: {
      type: String
    },
    planpara1:{
      type: String
    },
    planid2: {
      type: Number
    },
    planimg2:{
      type: String
    },
    planimg2alt:{
      type: String
    },
    planname2: {
      type: String
    },
    planpara2:{
      type: String
    },
    planid3: {
      type: Number
    },
    planimg3:{
      type: String
    },
    planimg3alt:{
      type: String
    },
    planname3: {
      type: String
    },
    planpara3:{
      type: String
    },
    planid4: {
      type: Number
    },
    planimg4:{
      type: String
    },
    planimg4alt:{
      type: String
    },
    planname4: {
      type: String
    },
    planpara4: {
      type: String
    },
    planid5: {
      type: Number
    },
    planimg5:{
      type: String
    },
    planimg5alt:{
      type: String
    },
    planname5: {
      type: String
    },
    planpara5: {
      type: String
    },
    planid6: {
      type: Number
    },
    planimg6:{
      type: String
    },
    planimg6alt:{
      type: String
    },
    planname6: {
      type: String
    },
    planpara6:{
      type: String
    },
    planid7: {
      type: Number
    },
    planimg7:{
      type: String
    },
    planimg7alt:{
      type: String
    },
    planname7: {
      type: String
    },
    planpara7:{
      type: String
    },
    planid8: {
      type: Number
    },
    planimg8:{
      type: String
    },
    planimg8alt:{
      type: String
    },
    planname8: {
      type: String
    },
    planpara8:{
      type: String
    },
    planid9: {
      type: Number
    },
    planimg9:{
      type: String
    },
    planimg9alt:{
      type: String
    },
    planname9: {
      type: String
    },
    planpara9:{
      type: String
    },
    planid10: {
      type: Number
    },
    planimg10:{
      type: String
    },
    planimg10alt:{
      type: String
    },
    planname10: {
      type: String
    },
    planpara10:{
      type: String
    },
    similarinspotitle:{
      type: String
    },
    similarinspopara :{
      type: String
    },
    similartitle1:{
      type: String
    },
    similarimg1:{
      type: String
    },
    similaralt1:{
      type: String
    },
    similarpara1:{
      type: String
    },
    similarlink1:{
      type: String
    },
    similarlinkdesc1:{
      type: String
    },
    similartitle2:{
      type: String
    },
    similarimg2:{
      type: String
    },
    similaralt2:{
      type: String
    },
    similarpara2:{
      type: String
    },
    similarlink2:{
      type: String
    },
    similarlinkdesc2:{
      type: String
    },
    similartitle3:{
      type: String
    },
    similarimg3:{
      type: String
    },
    similarsalt3:{
      type: String
    },
    similarpara3:{
      type: String
    },
    similarlink3:{
      type: String
    },
    similarlinkdesc3:{
      type: String
    },
    reviewid1:{
      type: Number
    },
    reviewiddesc1:{
      type: String
    },
    reviewtitle1:{
      type: String
    },
    reviewimg1:{
      type: String
    } ,
    reviewpara1:{
      type: String
    } ,
    reviewalt1:{
      type: String
    },
    reviewid2:{
      type: Number
    },
    reviewiddesc2:{
      type: String
    },
    reviewtitle2:{
      type: String
    },
    reviewimg2:{
      type: String
    } ,
    reviewpara2:{
      type: String
    } ,
    reviewalt2:{
      type: String
    },
    reviewid3:{
      type: Number
    },
    reviewiddesc3:{
      type: String
    },
    reviewtitle3:{
      type: String
    },
    reviewimg3:{
      type: String
    } ,
    reviewpara3:{
      type: String
    } ,
    reviewalt3:{
      type: String
    },
    eventSlug:{
      type: String
    },
    placement: {
      type: String
    },
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
  },
  { timestamps: true }
);

export default mongoose.model("Tour", TourSchema);