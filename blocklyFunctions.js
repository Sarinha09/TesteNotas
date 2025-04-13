const javascriptGenerator = Blockly.JavaScript;

const notas = [
  { imagem: 'imagens/nota1.png', nome: "nota_simples", cor: 210, valor: "♫" },
  { imagem: 'imagens/nota2.png', nome: "nota_dupla", cor: 330, valor: "♬" },
  { imagem: 'imagens/nota3.png', nome: "nota_solta", cor: 160, valor: "♪" },
  { imagem: 'imagens/nota4.png', nome: "clave_fa", cor: 290, valor: "𝄢" },
  { imagem: 'imagens/nota5.png', nome: "semínima", cor: 60, valor: "♩" },
  { imagem: 'imagens/nota6.png', nome: "bemol", cor: 120, valor: "♭" },
];

notas.forEach(function(nota) {
  Blockly.Blocks[nota.nome] = {
    init: function() {
      this.setColour(nota.cor);
      var image = new Blockly.FieldImage(nota.imagem, 16, 16, '*');
      this.appendDummyInput()
          .appendField("Tocar nota")
          .appendField(image)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  // REGISTRO DO GERADOR DE CÓDIGO PARA O BLOCO
  javascriptGenerator.forBlock[nota.nome] = function(block) {
    return `"${nota.valor}",`;
  };
});


Blockly.Blocks['repeat_times'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("repita 🔄")
      .appendField(new Blockly.FieldDropdown([
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"],
        ["10", "10"]
      ]), "TIMES")
      .appendField("vezes");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("faça");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

javascriptGenerator.forBlock['repeat_times'] = function (block) {
  const times = parseInt(block.getFieldValue('TIMES')); 
  const branch = javascriptGenerator.statementToCode(block, 'DO').trim();
  const cleanBranch = branch.replace(/,+$/, '');
  const repeated = Array(times).fill(cleanBranch).join(',');
  return repeated + ',';
};

    const temaCustomizado = Blockly.Theme.defineTheme('temaSara', {
      'base': Blockly.Themes.Classic,
      'componentStyles': {
        'workspaceBackgroundColour': '#fff', // Aqui você muda a cor de fundo
        'toolboxBackgroundColour': '#6699cc',
        'toolboxForegroundColour': '#ffffff',
        'flyoutBackgroundColour': '#6699cc',
        'flyoutForegroundColour': '#000000',
        'flyoutOpacity': 1,
        'scrollbarColour': '#8c6b4d',
        'insertionMarkerColour': '#ff0000',
        'insertionMarkerOpacity': 0.3,
        'markerColour': '#0000ff',
        'cursorColour': '#d900d9',
      }
    });

    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      theme: temaCustomizado
    });