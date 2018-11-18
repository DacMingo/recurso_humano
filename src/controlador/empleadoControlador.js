const controlador = {};
//res.send('hola mundo');

controlador.pagEmpleado = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    //req.getConnection((err, conn) => {
    //    conn.query('SELECT * FROM empleado', (err, empleado) => {
    //        if (err) {
    //            res.json(err);
    //        }
    //console.log(empleado);
    res.render('empleado'
        //        , {
        //            data: empleado
        //        }
    );
    //    });
    //});

};

controlador.pagCargar = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    //req.getConnection((err, conn) => {
    //    conn.query('SELECT * FROM empleado', (err, empleado) => {
    //        if (err) {
    //            res.json(err);
    //        }
    //console.log(empleado);
    res.render('cargarpagina.ejs'
        //        , {
        //            data: empleado
        //        }
    );
    //    });
    //});

};

controlador.pagListaEmpleado = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleado', (err, empleado) => {
            if (err) {
                res.json(err);
            }
            //console.log(empleado);
            res.render('listaempleado', {
                dato: empleado
            });
        });
    });

};
//PARA PASAR DATO A JOIN-----------------------------------------
controlador.pagListaEmpleadoCargarPagina = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleado', (err, empleado) => {
            if (err) {
                res.json(err);
            }
            //console.log(empleado);
            res.render('listaempleado', res.json(empleado));
        });
    });

};


controlador.pagListaContrato = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    req.getConnection((err, conn) => {
        conn.query('SELECT a.pnombre,a.snombre,a.papellido,a.sapellido,b.departamento,c.puesto,d.formapago,d.salario,d.id_contrato from contrato as d inner join empleado as a on a.id_empleado = d.id_empleado inner join departamento as b on b.id_departamento = d.id_departamento inner join puesto as c on c.id_puesto = d.id_puesto;', (err, contrato) => {
            if (err) {
                res.json(err);
            }
            //console.log(empleado);
            res.render('listacontrato', {
                datoContrato: contrato
            });
        });
    });

};

//PARA PASAR DATO A JOIN-----------------------------------------
controlador.pagListaContratoCargarPagina = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    req.getConnection((err, conn) => {
        conn.query('SELECT a.pnombre,a.snombre,a.papellido,a.sapellido,b.departamento,c.puesto,d.formapago,d.salario,d.id_contrato from contrato as d inner join empleado as a on a.id_empleado = d.id_empleado inner join departamento as b on b.id_departamento = d.id_departamento inner join puesto as c on c.id_puesto = d.id_puesto;', (err, contrato) => {
            if (err) {
                res.json(err);
            }
            //console.log(empleado);
            res.render('listacontrato', res.json(contrato));
        });
    });

};

controlador.save = (req, res) => {
    // req.body// data va contener todos los datos que vienen del formulario
    //console.log(req.body);
    //res.send('word');
    const dato = req.body;
    req.getConnection((req, conn) => {
        conn.query('INSERT INTO empleado set ?', [dato], (err, empleado) => {
            //console.log(empleado);
            //res.send('dsaf');
            res.redirect('/empleado');
            //res.send('<script type="text/javascript"> alert("GUARDADO CON EXITO"); </script>');
        });
    });
};

controlador.edit = (req, res) => {//enviar datos a la ventana
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleado WHERE id_empleado = ?', [id], (err, empleado) => {
            res.render('empleado_edit', {
                dato: empleado[0]
            });
        });
    });
};

controlador.update = (req, res) => {//enviar datos a la ventana
    const { id } = req.params;
    const nuevoEmpleado = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE empleado set ? WHERE id_empleado = ?', [nuevoEmpleado, id], (err, rows) => {
            res.redirect('/listaempleado');
        });
    });
};
//----------------------CONTRATO
controlador.pasarEmpleado = (req, res) => {//enviar datos a la ventana
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleado WHERE id_empleado = ?', [id], (err, empleado) => {
            res.render('contratoempleado', {
                datoEmpleado: empleado[0]
            });
        });
    });
};

controlador.pasarDepartamento = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM departamento', (err, departamento) => {
            res.render('contratoempleado', {
                datoDepartamento: departamento
            });
        });
    });

};

controlador.pasarPuesto = (req, res) => {
    //res.send('<script type="text/javascript"> alert("Hola Mundo!"); </script>');
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM puesto', (err, puesto) => {
            if (err) {
                res.json(err);
            }
            //console.log(empleado);
            res.render('contratoempleado', {
                datoPuesto: puesto
            });
        });
    });

};


controlador.saveContrato = (req, res) => {
    const datos = req.body;
    req.getConnection((req, conn) => {
        conn.query('INSERT INTO contrato set ?', [datos], (err, contrato) => {
            res.redirect('/listaempleado');
            
        });
    });
};

controlador.deleteContrato = (req, res) => {//insertar datos a la bd
    //console.log(req.params.id);
    //res.send('words');
    const { id } = req.params; //obtener id del dato req.params.id o {id} = req.params
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM contrato WHERE id_contrato = ?', [id], (err, rows) => {// ? dato que se va pasar
            res.redirect('/listacontrato');
        });
    });
};


controlador.delete = (req, res) => {//insertar datos a la bd
    //console.log(req.params.id);
    //res.send('words');
    const { id } = req.params; //obtener id del dato req.params.id o {id} = req.params
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM empleado WHERE id_empleado = ?', [id], (err, rows) => {// ? dato que se va pasar
            res.redirect('/listaempleado');
        });
    });
};



module.exports = controlador;