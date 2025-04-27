import "./Editor.css";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getStringedDate} from "../util/get-stringed-date";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const {kakao} = window;

    const s_lat = 37.55465000468857;
    const s_lng = 126.97059787494679;

const Editor = ({initData, onSubmit}) =>{
    const [input, setInput] = useState({
        tododate : new Date(),
        content : "",
    });

    const nav = useNavigate();
    
    useEffect(() => {
        if(initData){
            setInput({
                ...initData,
                tododate : new Date(Number(initData.tododate)),
            })
        }

    }, [initData]);

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value; 
        
        if(name === "tododate"){
            value = new Date(value);
        }
        
        setInput({
            ...input,
            [name] : value,

        });
    };

    const onClickSubmitButton = () => {
        onSubmit(input);
    }

    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: s_lat, lng: s_lng },
        //center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
      });
    const [searchAddress, SetSearchAddress] = useState('');     
    const [marker, setMarker] = useState(null);

      // 주소 입력후 검색 클릭 시 원하는 주소로 이동
    const SearchMap = () => {
        const geocoder = new kakao.maps.services.Geocoder(); 

        let callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const newSearch = result[0]
            setState({
              center: { lat: newSearch.y, lng: newSearch.x }
            })
          }
        };
          geocoder.addressSearch(`${searchAddress}`, callback);
        };
      
        const handleSearchAddress = (e) => {
            SetSearchAddress(e.target.value)        
        };    
           
    return (
        <div className="Editor">
            <section className="date_section">
                <h4>날짜</h4>
                <input 
                    name="tododate"
                    onChange={onChangeInput}
                    value={getStringedDate(input.tododate)} 
                    type="date"
                />
            </section>
            <section className="content_section">
                <h4>Todo</h4>
                <textarea 
                    name="content"
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder="일정을 적어주세요" />
            </section>
            <section className="place_section">
                <h4>위치</h4>
                <div id="map">
                <Map
                    center={{ lat: s_lat, lng: s_lng }}
                    style={{
                    width: '100%',
                    height: '500px',

                    }}
                >
                    <MapMarker
                        style={{ border: 'tranparent' }}
                        position={{ lat: s_lat, lng: s_lng }}
                    >
                    </MapMarker>
                </Map>
                <input onChange={handleSearchAddress}></input>
                <button onClick={SearchMap}>검색</button>

                </div>
            </section>
            <section className="button_section">
                <Button
                    onClick={() => nav(-1)} 
                    text={"취소하기"} />
                <Button
                    onClick={onClickSubmitButton} 
                    text={"작성완료"} type={"POSITIVE"} />
            </section>
        </div>

    )
}; 

export default Editor;