from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Carregar dados simulados
@app.route('/data')
def get_data():
    with open('data/mock_data.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para os painéis, agora buscando na pasta 'components'
@app.route('/panel/<panel_name>')
def panel(panel_name):
    try:
        # Tenta renderizar o painel correspondente na pasta 'components'
        return render_template(f'components/{panel_name}.html')
    except:
        return "Página não encontrada", 404

if __name__ == '__main__':
    app.run(debug=True)
