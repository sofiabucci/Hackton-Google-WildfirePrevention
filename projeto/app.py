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

# Rota para os painéis com estrutura atualizada
@app.route('/panel/<panel_name>')
def panel(panel_name):
    try:
        # Acessa o HTML no formato 'components/{panel_name}/{panel_name}.html'
        return render_template(f'components/{panel_name}/{panel_name}.html')
    except Exception as e:
        print(f"Erro ao carregar o painel: {e}")
        return "Página não encontrada", 404

if __name__ == '__main__':
    app.run(debug=True)
