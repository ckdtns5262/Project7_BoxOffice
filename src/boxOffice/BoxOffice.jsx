import { React,useEffect,useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../boxOffice/My06.css'



function BoxOffice() {


   // then, catch 구현
  //   const getBoxOffice = ()=>{

  
  
//   let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
//   url = url + 'key=' + "f5eef3421c602c6cb7ea224104795888";
//   url = url + '&targetDt=' + '20120101';

//     //비동기 통신
//     fetch(url)
//     .then((response)=>response.json())  // return 되는 것이 하나만 { } 생략가능
//     .then((data)=>{console.log(data)})
//     .catch((error)=>{console.log(error)})
// }

//     //페이지 처음 랜더링이 되었을때 실행되는 Hook
//     useEffect(()=>{
//       getBoxOffice()
//     },[])


  // state변수
  const [viewDay, setViewDay] = useState();
  const [viewDayF, setViewDayF] = useState();
  const [oList, setOList] = useState('');
  const [like, setLike] = useState(0);
  const txtRef = useRef();

  // ref변수
  const refDateIn = useRef();

  //비동기 통신 : async ... await
  const getBoxOffice = async(d)=>{

    let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888';
    url = url + '&targetDt=' + d ;
  
    try {
    const response = await fetch(url);   //fetch
    const data = await response.json();    //fetch 후에 data 진행
    console.log(data.boxOfficeResult.dailyBoxOfficeList);
    let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      setOList(
        dailyBoxOfficeList.map((item)=>
       
      <li className="mvLi" key={item.movieCd}>
         <Link to={'/mv?mvcd=' + item.movieCd}>  
       <span className='rank'> {item.rank}</span>
        {item.movieNm}
        {/* {item.rankInten  0 ? "👍" : item.rankInten < 0 ? '👎' : ""} */}
        {/* {Math.abs(Number(item.rankInten))}   */}
        </Link>
        <div className="hart">
          <span onClick={()=>{setLike(like + 1)}}>💖</span>{like}
          </div>
      </li>
  
      ))}
    catch(error) {
    console.log(error)
    }

  

  }
  //페이지 처음 랜더링이 되었을때 실행되는 Hook
    useEffect(()=>{
      // 어제 날짜 추출
      //const today = new Date(); 
      const yesterday = new Date()
      yesterday.setDate(new Date().getDate()-1);
      let d = yesterday.toISOString().substring(0,10).replaceAll('-','') //subString 0에서 9번째까지 남기고 replaceall은 - 전부 지움
      console.log(d)
  
      //state변수 변경
      setViewDay(d)
  
      // 박스 오피스 open API 호출
      getBoxOffice(d)
  },[])
  
  useEffect(()=>{
    (viewDay && setViewDayF(viewDay.substring(0,4)+'.'+ viewDay.substring(4,6)+'.'+ viewDay.substring(6,8)))
    
    getBoxOffice(viewDay) 
  },[viewDay])




  // 이벤트 함수
  const handleChange = (e)=>{
    e.preventDefault();
    setViewDay(refDateIn.current.value.replaceAll('-',''));
  }

  const handleClick = (e)=>{
    e.preventDefault();
    alert('검색기능 제한됩니다')
  }
  
  
  return ( <>
  
    
    <h1>BoxOffice ({viewDayF}일자)</h1>
    <form className='form1'>
      <span className='put'>영화명입력</span>
      <input type="text" placeholder="영화명을 입력하세요" ref={txtRef}></input>
      <div className='but'>
         <button type='button' onClick={handleClick} className="btn btn-primary">확인</button>
        <button type='reset'className="btn btn-danger">취소</button>
      </div>
      <input type="date" name='dateIn' className="input"ref={refDateIn} onChange={handleChange}/>
    </form>
    <div className="box1">
    <ul>
      {oList}
      
    </ul>
  
  </div>
  
  </> );
}

export default BoxOffice;