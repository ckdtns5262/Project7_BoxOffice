// useState Hook
import { useState, useEffect, useRef } from 'react';
import '../boxOffice/MvInfo.css'



function MvInfo(props) {
  

  //state 변수
  // const [Like, setLike] = useState(0);
  // const [dLike, setdLike] =useState(0); 

  // json 데이터 가져오기
  const mvinfo = props.m.movieInfoResult.movieInfo;
  
  // 화면에 출력할 정보를 오브젝트 생성
  let myInfo ={};
  const key1 = ['movieNm', 'movieCd', 'openDt', 'prdtStatNm','showTm']
  const key2 = ['audits', 'nations', 'directors','genres','companys']


  // key값을 바꾸려고 할 때 keys라는 object를 만듬 
  const keys ={
    'movieNm' : "영화명",
    'movieCd' : "영화코드",
    'openDt' : "개봉일",
    'prdtStatNm' : '제작상태',
    'showTm' : "상영시간",
    'audits' : "관람등급",
    'nations' : "제작국가",
    'directors' : "감독",
    'genres' : "장르",
    'companys' :"배급사"
  }



  // key1에 해당하는 값추출
  for(let k of key1) {
    myInfo[keys[k]] = mvinfo[k]; // key 값을 한글로 변환함
    //console.log(myInfo)
  }

  // key2에 해당하는 값 추출 : 배열에서 추출
  for(let k of key2) {
    switch(k) {
      case 'audits' : 
        myInfo[keys[k]] = mvinfo[k].map((item)=>item.watchGradeNm);
        break;
      case 'nations' :
        myInfo[keys[k]] = mvinfo[k].map((item)=>item.nationNm)
        break;
      case 'directors' :
        myInfo[keys[k]] = mvinfo[k].map((item)=>item.peopleNm)
        break;
      case 'genres' :
        myInfo[keys[k]] = mvinfo[k].map((item)=>item.genreNm)
        break;
      case 'company' : 
      default :
        myInfo[keys[k]] = mvinfo[k].filter((item)=>item.companyPartNm === "배급사")
        .map((item)=>item.companyNm)
      break;
      
      }
  }

  // 화면에 출력할 내용을 JSX로 만들기
  const lis = [];

  for (let [k,v] of Object.entries(myInfo)) {
    lis.push( <li key={myInfo.movieCd + k}><span>{k}</span> : {v}</li>)
  }

  //count 제어
  let cntUp = 0;
  let cntDown = 0;

  //state 변수
  let [cntUpSt, setcntUpSt] = useState(0);
  let [cntDownSt, setcntDownSt] = useState(0);
  // const [on, setOn] = useState(false)
  // const [flag, setFlag] =useState(true)
  const [detail, setDetail] = useState(false) 
  const [txt1, setTxt1] = useState([]);



  const handleUp = () =>{
    //console.log('local변수 : ', ++cntUp)
    
  // state 변수 증가
    setcntUpSt(++cntUpSt)
    //console.log('state변수 :' , cntUpSt)
    
  }

  const handlDown = () =>{
   // console.log('local변수 : ', ++cntDown)

    setcntDownSt(++cntDownSt)
    //console.log('state변수 :' , cntDownSt)
    
  }

  // useEffect Hook : 랜더링시 매번 발생
  useEffect(()=>{
  //  console.log('useEffect 랜더링 발생시 계속 수행')
   // console.log(cntRef.current)
  })
  // useEffect Hook : 컴포넌트 발생시 한번 발생
  useEffect(()=>{
   // console.log('useEffect 컴포넌트 발생시 한번 발생')
    //console.log('ref cnt:', cntRef.current); // useRef로 생성된 것은 object 타입이라서 .current 붙여줘야함
    txtRef.current.focus();

  }, [])
  // useEffect Hook : 관련state변수가 변경될 때 실행
  useEffect(()=>{
    //console.log('useEffect 관련state변수가 변경될 때 실행')
  }, [cntUpSt, detail])

  
 

  // ref 변수
  const cntRef = useRef(0);
  const txtRef = useRef();
  
  // 시계아이콘을 클릭하면 flag 변수 변경
  // const showTimer = ()=> {
  //   setOn(!on)
  //   setFlag(flag === 'none' ? 'inline-flex' : 'none')
  //   // console.log(cntRef.current)
  
  // }  
  // const showLike = ()=>{
  //   setShow(!show)
  // }
  const showDetail = () => {
    setDetail(!detail)
  }
  //form submit 
  const handleSubmit = (e)=>{
    e.preventDefault(); // 재렌더링이 되는것을 막아주려고 사용
    //console.log(txtRef.current.value)
    setTxt1([<li key={txtRef.current.value} className="refLi">
      {txtRef.current.value}
      </li>, ...txt1])
  }




  return (<>
      <h2>영화상세</h2>
       <button onClick={showDetail} className="btn btn-warning">접기</button>
     { !detail && <div className='content'>
    <ul>
      {lis}
      {/* <button onClick={showLike}>버튼</button> */}
     <div className='likes'>
      {/* <span onClick={()=>{setLike(Like + 1)}}>👍</span>{Like}
      <span onClick={()=>{setdLike(dLike + 1)}}>👎</span>{dLike} */}
      <span onClick={handleUp}>👍</span>{ "좋아요 갯수 : " + cntUpSt }
      <span onClick={handlDown}>👎</span>{"싫어요 갯수 : " + cntDownSt}
      {/* <span onClick={setFlag(!flag)}>⏰</span> */}
      </div>
    </ul>
    </div>}
    {/* true , false를 이용하여 useState 조절*/}
    <div className='timer'>
    {/* { flag === true ? <MvTimer/> : ""} */}
    </div>
      <form className='mvForm' onSubmit={handleSubmit}>
        <div className='likes'>
        <textarea type="text" ref={txtRef} placeholder='댓글을 입력하세요.'></textarea>
        </div>
        <div className='but'>
        <button type="submit" className="btn btn-primary">등록</button>
        <button type='reset'className="btn btn-danger">취소</button>
        </div>
      </form>
      <div className='content'>
        <ul>        
        {txt1}
        </ul>
      </div>
   

    {/* style로 useState 조절*/}
      {/* <div className='timer' style={{'display' : flag}}>
    {<MvTimer/>}
      </div> */}

  </>  );
}

export default MvInfo;