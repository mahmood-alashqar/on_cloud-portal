import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import './style.css';
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: [],
      API: process.env.REACT_APP_API,
      comment:''
    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`${this.state.API}/products`);
    this.setState({
      mainData: getRequest.data
    })
    console.log(this.state.mainData)
  }
  postData = async (data) => {
    await axios.post(`${this.state.API}/products/Favorite`, data);
  }
  addComment = async (e,slug) => {
    e.preventDefault();
    const body={
      slug:slug,
      comment:this.state.comment
    }
    await axios.post(`${this.state.API}/products/Favorite/${slug}`, body);
  }
  imagePopUp = (e) => {
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    document.addEventListener("click", (e) => {
      const elem = e.target;
      if (elem.id === "myImg") {
        modal.style.display = "block";
        modalImg.src = elem.dataset.biggerSrc || elem.src;
        captionText.innerHTML = elem.alt;
      }
    })
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
  }
  updateComment=(e)=>{
    this.setState({
      comment:e.target.value
    })
  }
  render() {
    return (
      <div>
        <Row xs={2} md={5} className="g-1" >
          {this.state.mainData.map((data, idx) => {
            return (<div key={idx}>
              <Card style={{ width: '18rem', height: '40rem' }}>
                <Card.Img variant="top" src={data.img} id="myImg" class="img-fluid"
                  data-bigger-src={data.img} alt='' onClick={(e) => { this.imagePopUp(e) }} />
                <div id="myModal" class="modal">
                  <span class="close">&times;</span>
                  <img id="modal-img" class="modal-content" alt='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS2ol73JZj6-IqypxPZXYS3rRiPwKteoD8vezk9QsRdkjt3jEn&usqp=CAU" />
                  <div id="caption"></div>
                </div>
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>{data.price}</Card.Text>
                  <Card.Subtitle>{data.colour}</Card.Subtitle>
                  {/* <>
                    {
                      // this.data.comments.map((comment, idx) => {
                      //   return (
                          <Comment>{data.comments}</Comment>
                      //   )
                      // })
                    }
                  </>
                  <Form onSubmit={(e) => this.addComment(e,data.slug)}>
                    <FormControl onChange={() => this.updateComment} type='text' />
                    <Button variant="primary" type='submit' value='Update'>Add Comment</Button>
                  </Form> */}
                  <Button variant="primary" onClick={() => this.postData(data)}>Add To Favorite</Button>
                </Card.Body>
              </Card>
              <br />
            </div>
            )
          })
          }
        </Row>
      </div>
    )
  }
}

export default withAuth0(Main)