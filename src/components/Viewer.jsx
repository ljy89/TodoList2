import "./Viewer.css"

const Viewer = ({content}) => {

    return (
        <div className="Viewer">
            <section className="content_sction">
                <h4>Todo</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    )
}

export default Viewer;