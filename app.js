function getReviewsListFromServer(){
    return fetch("http://localhost:3000/reviews");
}

function createReviewOnServer(review){
    var reviewData= "name=" + encodeURIComponent(review.name);
    reviewData += "&lastName=" + encodeURIComponent(review.lastName);
    reviewData += "&rating=" + encodeURIComponent(review.rating);
    reviewData += "&review=" + encodeURIComponent(review.review);

    return fetch("http://localhost:3000/reviews", {
        method: "POST",
        body: reviewData,
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        firstNameInput: "",
        lastNameInput: "",
        ratingInput: 4,
        reviewInput: "",
        time: "",
        reviews: []
    },
    methods: {
        submitReview: function(){
            var newReview ={
                name: this.firstNameInput,
                lastName: this.lastNameInput,
                rating: this.ratingInput,
                review: this.reviewInput 
            }
            createReviewOnServer(newReview);
            this.loadData()
            this.firstNameInput = "";
            this.lastNameInput = "";
            this.ratingInput = "";
            this.reviewInput = "";

        },
        loadData: function(){
            getReviewsListFromServer().then((response)=>{
                response.json().then((data)=>{
                    console.log("this is the data", data);
                    this.reviews = data;
                })
            })
        }
    },
    created: function(){
        this.loadData();
    }
})