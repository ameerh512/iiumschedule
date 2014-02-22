from flask import Flask, render_template, request, g, jsonify
from bootstrap import app,db
from models import SubjectData,SectionData
import json
@app.route('/schedulemaker/fetch_subject/')
def fetchsubject():
	if(set(['session','semester','coursetype']).issubset(request.args.keys()) and [x for x in ['session','semester','coursetype'] if request.args.get(x)!='' ]):
		sdlist=db.session\
			.query(SubjectData.kuliyyah,SubjectData.code,SubjectData.title,SubjectData.id)\
			.filter(SubjectData.session==request.args.get('session'))\
			.filter(SubjectData.semester==request.args.get('semester'))\
			.filter(SubjectData.coursetype==request.args.get('coursetype').upper())\
			.all()

		finalres={}
		for r in sdlist:
			if(r[0] not in finalres):
				finalres[r[0]]=[]
			finalres[r[0]].append({
				'id':r[3],
				'code':r[1],
				'title':r[2],
			});
		return json.dumps(finalres)
	return 'Arguments not filled';

from sqlalchemy.ext.declarative import DeclarativeMeta
class AlchemyEncoder(json.JSONEncoder):
	def default(self, obj):
	    if isinstance(obj.__class__, DeclarativeMeta):
	        # an SQLAlchemy class
	        fields = {}
	        for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
	            data = obj.__getattribute__(field)
	            try:
	                json.dumps(data) # this will fail on non-encodable values, like other classes
	                fields[field] = data
	            except TypeError:
	                fields[field] = None
	        # a json-encodable dict
	        return fields

	    return json.JSONEncoder.default(self, obj)


@app.route('/schedulemaker/fetch_section/')
def fetchsection():
	if('id' not in request.args.keys()):
		return 'Arguments not filled'
	finalres=SectionData.query.filter(SectionData.subject_id==request.args.get('id')).all()
	finalres=[{
        'id':x.id,
		'subject_id':x.subject_id,
		'sectionno':x.sectionno,
		'lecturer':x.lecturer,
		'venue':x.venue,
		'day':x.day,
		'time':x.time,
	} for x in finalres]
	return json.dumps(finalres,cls=AlchemyEncoder)

@app.route('/schedulemaker/')
def schedulemaker():
	return render_template('schedulemaker.html')