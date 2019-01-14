import React from 'react';


export default (props) => (
    <div className="news-article" key={props.article.datetime}>
        <h6 className="article-date">
            {new Date(props.article.datetime).toDateString()}
        </h6>
        <h4 className="article-headline">
            <a href={props.article.url}>
                {props.article.headline}
            </a>
            &nbsp; - &nbsp; 
            <span className="article-source">
                {props.article.source}
            </span>
        </h4>
        <p className="article-summary">{props.article.summary}</p>
        <style>
            {`
                .news-article{
                    border: 2px solid #999;
                    border-radius: 10px;
                    margin: auto;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    padding: 5px;
                    max-width: 100%;
                    box-shadow: 3px 3px 5px 0 rgba(0,0,0,0.3);
                }

                .article-date{
                    color: #666;
                }

                .article-headline > a {
                    color: #333;
                }

                .article-headline > a:hover {
                    color: #555;
                }

                .article-source{
                    font-weight: normal;
                    color: #777;
                }
            `}
        </style>
    </div>
)