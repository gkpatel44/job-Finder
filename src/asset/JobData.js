import React from 'react'
const doubleclick=(e)=>{
  console.log("clicked",e.target.name);
}
export const JobData = (datas) => {
  const userdata = datas.datas

  return (
    <div className="job-item" >
      {userdata.map(dataa =>

        <div onDoubleClick={doubleclick} className="card mb-3" key={dataa.id} >
          <div className="row no-gutters">
            <div className="col-md-4" >
              <img className="bd-placeholder-img" alt="job" src="https://pyxis.nymag.com/v1/imgs/9ef/e47/5515cb84df2ff0179bbc35708ab9d47b02-15-link.rsquare.w330.jpg" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{dataa.title}</h5><hr />
                <p className="card-text">
                  {dataa.type}
                </p>
                <hr />
                <p className="card-text">
                  <small className="text-muted">{dataa.company}</small><br /><hr />
                  <small className="text-muted">{dataa.location}</small><br /><hr />
                  <small className="text-muted">{dataa.created_at}</small><br /><hr />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

