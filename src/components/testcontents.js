import './chatBot.css';
import react, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BiBot, BiUser } from 'react-icons/bi';
import logo2 from '../assets/logo2.png'

function Basic() {
    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [botTyping, setbotTyping] = useState(false);
    // var recipentmsg = 
    const [msgstring, setmsgstring] = useState([])

    useEffect(() => {

        console.log("called");
        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;


    }, [chat])




    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = "Talky";
        const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

        if (inputMessage !== "") {

            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name, inputMessage);
        }
        else {
            window.alert("Please enter valid message");
        }

    }


    const rasaAPI = async function handleClick(name, msg) {

        //chatData.push({sender : "user", sender_id : name, msg : msg});


        await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
            .then(response => response.json())
            .then((response) => {
                if (response) {
                    console.log(response)
                    const temp = response[0];
                    const recipient_id = temp["recipient_id"];
                    const recipient_msg = temp["text"];
                    const msg =  `${recipient_msg}`
                    var res = msg.split(' ');
                    var count  = res.length-1 ;
                    var link = res[count]
                    var linkdata = link.split('')
                    var bool = linkdata.length > 2
                    res.pop()
                    var rendermsg = res.join(' ')


                    const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg,link:link,bool:bool,rendermsg:rendermsg};
                    setmsgstring(temp["text"])
                    setbotTyping(false);

                    setChat(chat => [...chat, response_temp]);
                    // scrollBottom();
                    console.log(res)
                }
            })

    }
    

    const stylecard = {
        maxWidth: '35rem',
        // border: '1px solid black',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '30px',
        boxShadow: '0 16px 20px 0 rgba(0,0,0,0.4)'

    }
    const styleHeader = {
               height: '60px',
        borderBottom: '1px solid black',
        borderRadius: '30px 30px 0px 0px',
        /* background-color: red; */
        padding: '10px',
        backgroundColor: '#082032',
        color: '#fff',
        display:'flex',
        alignItems:'center',
        gap:'10px',

    }
    const styleFooter = {
        //maxWidth : '32rem',
        borderTop: '1px solid black',
        borderRadius: '0px 0px 30px 30px',
        backgroundColor: 'red',


    }
    const styleBody = {
        paddingTop: '10px',
        height: '28rem',
        overflowY: 'a',
        overflowX: 'hidden',

    }


    return (
       


            <div className="container">
                <div className="row justify-content-center">

                    <div className="card" style={stylecard}>
                        <div className="card-header" style={styleHeader}>
                            <img src={logo2} className="hdr-logo"/>
                            <div className='div-hdr'>
                            <h1 className='bot-hd1'>Talky</h1>
                            <p className='bot-hd1'>Say Hi! We are TalkingLands</p>
                            </div>
                            {botTyping ? <h6>Bot Typing....</h6> : null}



                        </div>
                        <div className="cardBody" id="messageArea" style={styleBody}>

                            <div className="row msgarea">
                                {chat.map((user, key) =>  (
                                    <div key={key}>
                                        {user.sender === 'bot' ?
                                            (

                                                <div className='msgalignstart'>
                                                    {/* <BiBot className="botIcon" /> */}
                                                    <img src={logo2} className='rec-img'/>
                                                    <div className="botmsg">
                                                        <p style={{margin:'0'}}>{user.rendermsg}</p>
                                                        {user.bool &&  <a href={user.link} target="blank">Click!</a>}
                                                        </div>
                                                </div>

                                            )

                                            : (
                                                <div className='msgalignend'>
                                                    <h5 className="usermsg">{user.msg}</h5><BiUser className="userIcon" />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}

                            </div>

                        </div>
                        <div className="cardFooter text-white" style={styleFooter}>
                            <div className="row">
                                <form onSubmit={handleSubmit} className="chatform">
                                    <div className="col-10" style={{ paddingRight: '0px' }}>
                                        <input onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text" className="msginp"></input>
                                    </div>
                                    <div className="col-2 cola">
                                        <button type="submit" className="circleBtn" ><IoMdSend className="sendBtn" /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

    );
}

export default Basic;