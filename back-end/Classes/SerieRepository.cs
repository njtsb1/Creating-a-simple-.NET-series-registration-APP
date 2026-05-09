// Classes/SerieRepository.cs
using System;
using System.Collections.Generic;
using DIO.Series.Interfaces;

namespace DIO.Series
{
    public class SerieRepository : IRepository<Serie>
    {
        private List<Serie> listSerie = new List<Serie>();

        public void Update(int id, Serie objeto)
        {
            listSerie[id] = objeto;
        }

        public void Delete(int id)
        {
            listSerie[id].Delete();
        }

        public void Insert(Serie objeto)
        {
            listSerie.Add(objeto);
        }

        public List<Serie> List()
        {
            return listSerie;
        }

        public int NextId()
        {
            return listSerie.Count;
        }

        public Serie GetById(int id)
        {
            return listSerie[id];
        }
    }
}
