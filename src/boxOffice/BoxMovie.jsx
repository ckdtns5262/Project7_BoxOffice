import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'
import { useEffect, useState } from 'react';
import MvInfo from './MvInfo';


export default function BoxMovie() {
  
  

  const[movieInfo, setMovieInfo] = useState();

  const loc = useLocation().search
  //console.log(loc)
  
  const mvcd = qs.parse(loc).mvcd                // .mvcd 붙이면 영화카드만 남게됨
  console.log(mvcd)

//   const getMovie = ()=>{

//   let url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?'
//   url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888&movieCd=20124079'
//   url = url + '&movieCd=' + '20124079'

//   fetch(url)
//   .then((response)=>response.json())
//   .then((data)=>console.log(data))

//   .catch((error)=>console.log(error))
// }
 // 함수 
  const getMovie = async (mvcd)=> {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?'
    url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888'
    url = url + '&movieCd=' +  mvcd
  
  const resp = await fetch(url);
  const data = await resp.json();
  
  setMovieInfo(data) ;
    
  }

  useEffect(()=>{
    getMovie(mvcd)
    

  },[])
  
  useEffect(()=>{
    console.log(movieInfo)
  },[movieInfo])
  
  
  
  
  return ( 
    <>
    <h1>영화정보</h1>
    {movieInfo && <MvInfo m={movieInfo}/>}
    </>
   );
}

